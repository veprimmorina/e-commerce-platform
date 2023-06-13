package com.javatechie.jwt.api.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.javatechie.jwt.api.entity.AuthRequest;
import com.javatechie.jwt.api.entity.GoogleAuthenticationRequest;
import com.javatechie.jwt.api.entity.UserEntity;
import com.javatechie.jwt.api.repository.ConfirmationTokenRepository;
import com.javatechie.jwt.api.repository.RegisterUserRepository;
import com.javatechie.jwt.api.service.CustomUserDetailsService;
import com.javatechie.jwt.api.service.EmailService;
import com.javatechie.jwt.api.service.GoogleUserService;
import com.javatechie.jwt.api.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WelcomeControllerTest {

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private RegisterUserRepository userRepository;

    @Mock
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private GoogleUserService googleUserService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private WelcomeController welcomeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void decodeJwt_ShouldReturnClaims() {
        // Arrange
        String jwtToken = "your-jwt-token";
        Claims claims = Jwts.claims();
        claims.put("name", "John Doe");
        claims.put("lastName", "Doe");
        claims.setSubject("john.doe@example.com");
        claims.setExpiration(new Date());

        when(jwtUtil.extractAllClaims(jwtToken)).thenReturn(claims);

        // Act
        ResponseEntity<?> response = welcomeController.decodeJwt(jwtToken);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(claims, response.getBody());
    }
    @Test
    void decodeJwt_ValidToken_ReturnsClaims() {
        // Arrange
        String jwtToken = "valid-jwt-token";
        Claims claims = mock(Claims.class);

        // Mock the behavior of jwtUtil
        when(jwtUtil.extractAllClaims(jwtToken)).thenReturn(claims);

        // Act
        ResponseEntity<?> response = welcomeController.decodeJwt(jwtToken);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(claims, response.getBody());
    }



}