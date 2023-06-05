package com.javatechie.jwt.api.controller;

import com.javatechie.jwt.api.entity.AuthRequest;
import com.javatechie.jwt.api.entity.ConfirmationToken;
import com.javatechie.jwt.api.entity.UserEntity;
import com.javatechie.jwt.api.repository.ConfirmationTokenRepository;
import com.javatechie.jwt.api.repository.RegisterUserRepository;
import com.javatechie.jwt.api.service.CustomUserDetailsService;
import com.javatechie.jwt.api.service.GoogleUserService;
import com.javatechie.jwt.api.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WelcomeControllerTest {

    private WelcomeController welcomeController;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private GoogleUserService googleUserService;

    @Mock
    private RegisterUserRepository userRepository;

    @Mock
    private ConfirmationTokenRepository confirmationTokenRepository;

    @BeforeEach
    void setup() {
        jwtUtil = mock(JwtUtil.class);
        authenticationManager = mock(AuthenticationManager.class);
        customUserDetailsService = mock(CustomUserDetailsService.class);
        googleUserService = mock(GoogleUserService.class);
        userRepository = mock(RegisterUserRepository.class);
        confirmationTokenRepository = mock(ConfirmationTokenRepository.class);
        welcomeController = new WelcomeController(jwtUtil, authenticationManager, customUserDetailsService, googleUserService, userRepository);

    }
    @Test
    void generateToken_ValidCredentials_ReturnsToken() throws Exception {
        // Arrange
        String username = "test";
        String password = "test123";
        AuthRequest authRequest = new AuthRequest(username, password);

        UserDetails userDetails = mock(UserDetails.class);
        when(customUserDetailsService.loadUserByUsername(username)).thenReturn(userDetails);

        BCryptPasswordEncoder passwordEncoder = mock(BCryptPasswordEncoder.class);
        when(passwordEncoder.matches(password, userDetails.getPassword())).thenReturn(true);

        UserEntity userEntity = mock(UserEntity.class);
        when(userRepository.findByUserName(username)).thenReturn(userEntity);
        when(userEntity.getRole()).thenReturn(0); // Assuming role 2 is valid

        when(jwtUtil.generateToken(username, userEntity.getFirstName(), userEntity.getLastName(), userEntity.getRole())).thenReturn("token");

        // Act
        String token = welcomeController.generateToken(authRequest);

        // Assert
        assertNotNull(token);
        assertEquals("token", token);
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    public void testGenerateAdminToken_NonvalidCredentials() throws Exception {
        // Mock the behavior of the necessary dependencies
        AuthRequest authRequest = new AuthRequest();
        authRequest.setUserName("admin");
        authRequest.setPassword("admin123");

        UserDetails userDetails = mock(UserDetails.class);
        when(customUserDetailsService.loadUserByUsername(authRequest.getUserName())).thenReturn(userDetails);
        when(userDetails.getPassword()).thenReturn("admin123");

        UserEntity userEntity = new UserEntity();
        userEntity.setRole(1);
        when(userRepository.findByUserName(authRequest.getUserName())).thenReturn(userEntity);

       try{
           //welcomeController.generateAdminToken(authRequest);
           fail("Exception should have been thrown");
       }catch (Exception e){
           assertEquals("Invalid username/password", e.getMessage());
       }
    }

}
