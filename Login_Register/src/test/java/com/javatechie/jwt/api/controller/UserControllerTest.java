package com.javatechie.jwt.api.controller;
import com.javatechie.jwt.api.entity.ConfirmationToken;
import com.javatechie.jwt.api.entity.UserEntity;
import com.javatechie.jwt.api.repository.ConfirmationTokenRepository;
import com.javatechie.jwt.api.repository.RegisterUserRepository;
import com.javatechie.jwt.api.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.mail.SimpleMailMessage;
import static org.junit.jupiter.api.Assertions.assertEquals;
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
}