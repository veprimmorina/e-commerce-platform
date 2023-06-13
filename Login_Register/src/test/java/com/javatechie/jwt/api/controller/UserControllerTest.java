package com.javatechie.jwt.api.controller;
import com.javatechie.jwt.api.entity.ConfirmationToken;
import com.javatechie.jwt.api.entity.UserEntity;
import com.javatechie.jwt.api.repository.ConfirmationTokenRepository;
import com.javatechie.jwt.api.repository.RegisterUserRepository;
import com.javatechie.jwt.api.service.EmailService;
import javassist.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.servlet.ModelAndView;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserControllerTest {


    private UserController userController;

    @Mock
    private RegisterUserRepository userRepository;

    @Mock
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Mock
    private EmailService emailService;

    @BeforeEach
    void setup() {
        userRepository = mock(RegisterUserRepository.class);
        confirmationTokenRepository = mock(ConfirmationTokenRepository.class);
        emailService = mock(EmailService.class);

        userController = new UserController(userRepository,confirmationTokenRepository,emailService);


    }


    @Test
    void registerUser_shouldReturnSuccessMessage() {
        // Create a user entity
        UserEntity userEntity = new UserEntity();
        userEntity.setEmailId("morinaveprim1@gmail.com");
        userEntity.setPassword("password");

        // Mock the behavior of the userRepository
        when(userRepository.findByEmailIdIgnoreCase(userEntity.getEmailId())).thenReturn(null);
        when(userRepository.save(userEntity)).thenReturn(userEntity);

        // Mock the behavior of the confirmationTokenRepository
        ConfirmationToken confirmationToken = new ConfirmationToken(userEntity);
        when(confirmationTokenRepository.save(any(ConfirmationToken.class))).thenReturn(confirmationToken);

        // Mock the behavior of the emailService
        doNothing().when(emailService).sendEmail(any(SimpleMailMessage.class));

        // Call the registerUser method
        String result = userController.registerUser(userEntity);

        // Verify the interactions and assertions
        verify(userRepository).findByEmailIdIgnoreCase(userEntity.getEmailId());
        verify(userRepository).save(userEntity);
        verify(confirmationTokenRepository).save(any(ConfirmationToken.class));
        verify(emailService).sendEmail(any(SimpleMailMessage.class));
        assertEquals("Email has been sent", result);
        System.out.println(result);

    }
    @Test
    void registerUser_shouldReturnErrorMessageIfEmailExists() {
        // Create a user entity
        UserEntity userEntity = new UserEntity();
        userEntity.setEmailId("test@example.com");
        userEntity.setPassword("password");

        // Mock the behavior of the userRepository
        when(userRepository.findByEmailIdIgnoreCase(userEntity.getEmailId())).thenReturn(userEntity);

        // Call the registerUser method
        String result = userController.registerUser(userEntity);

        // Verify the interactions and assertions
        verify(userRepository).findByEmailIdIgnoreCase(userEntity.getEmailId());
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(confirmationTokenRepository, never()).save(any(ConfirmationToken.class));
        verify(emailService, never()).sendEmail(any(SimpleMailMessage.class));
        assertEquals("This email already exists!", result);
        System.out.println(result);

    }
    @Test
    void resetPassword_NonExistingUserEntity_ReturnsNotFoundErrorMessage() throws NotFoundException {
        // Arrange
        UserEntity userEntity = new UserEntity();
        userEntity.setEmailId("test@example.com");

        when(userRepository.findByEmailIdIgnoreCase(userEntity.getEmailId())).thenReturn(null);

        // Act
        String response = userController.resetPassword(userEntity);

        // Assert
        assertEquals("User not found!", response);
        verify(userRepository, times(1)).findByEmailIdIgnoreCase(userEntity.getEmailId());
        verify(userRepository, never()).save(any(UserEntity.class));
        verify(confirmationTokenRepository, never()).save(any(ConfirmationToken.class));
        verify(emailService, never()).sendEmail(any(SimpleMailMessage.class));

    }
    @Test
    void confirmUserAccount_InvalidConfirmationToken_ReturnsErrorPageModelAndView() {
        // Arrange
        String confirmationToken = UUID.randomUUID().toString();

        when(confirmationTokenRepository.findByConfirmationToken(confirmationToken)).thenReturn(null);

        // Act
        ModelAndView modelAndView = userController.confirmUserAccount(confirmationToken);

        // Assert
        assertNotNull(modelAndView);
        assertEquals("error-page", modelAndView.getViewName());
        verify(confirmationTokenRepository, times(1)).findByConfirmationToken(confirmationToken);
        verify(userRepository, never()).findByEmailIdIgnoreCase(anyString());
        verify(userRepository, never()).save(any(UserEntity.class));
    }
    @Test
    void resetPasswordPage_ValidConfirmationToken_ReturnsResetPasswordModelAndView() {
        // Arrange
        String confirmationToken = UUID.randomUUID().toString();

        ConfirmationToken token = new ConfirmationToken();
        token.setConfirmationToken(confirmationToken);

        when(confirmationTokenRepository.findByConfirmationToken(confirmationToken)).thenReturn(token);

        // Act
        ModelAndView modelAndView = userController.resetPassword(confirmationToken);

        // Assert
        assertNotNull(modelAndView);
        assertEquals("reset-password", modelAndView.getViewName());
        assertEquals(confirmationToken, modelAndView.getModel().get("token"));
        verify(confirmationTokenRepository, times(1)).findByConfirmationToken(confirmationToken);
    }
    @Test
    void resetPasswordPage_InvalidConfirmationToken_ReturnsErrorPageModelAndView() {
        // Arrange
        String confirmationToken = UUID.randomUUID().toString();

        when(confirmationTokenRepository.findByConfirmationToken(confirmationToken)).thenReturn(null);

        // Act
        ModelAndView modelAndView = userController.resetPassword(confirmationToken);

        // Assert
        assertNotNull(modelAndView);
        assertEquals("error-page", modelAndView.getViewName());
        assertEquals("The link is invalid or broken!", modelAndView.getModel().get("message"));
        verify(confirmationTokenRepository, times(1)).findByConfirmationToken(confirmationToken);
    }
    @Test
    void confirmResetPassword_InvalidConfirmationToken_ReturnsErrorPageModelAndView() throws Exception {
        // Arrange
        String confirmationToken = UUID.randomUUID().toString();
        String newPassword = "newpassword";

        when(confirmationTokenRepository.findByConfirmationToken(confirmationToken)).thenReturn(null);

        // Act
        ModelAndView modelAndView = userController.confirmResetPassword(confirmationToken, newPassword);

        // Assert
        assertNotNull(modelAndView);
        assertEquals("error-page.html", modelAndView.getViewName());
        verify(confirmationTokenRepository, times(1)).findByConfirmationToken(confirmationToken);
        verify(confirmationTokenRepository, never()).save(any(ConfirmationToken.class));
        verify(userRepository, never()).save(any(UserEntity.class));
    }

    }