package com.javatechie.jwt.api.controller;


import com.javatechie.jwt.api.entity.ConfirmationToken;
import com.javatechie.jwt.api.entity.UserEntity;
import com.javatechie.jwt.api.repository.ConfirmationTokenRepository;
import com.javatechie.jwt.api.repository.RegisterUserRepository;
import com.javatechie.jwt.api.service.EmailService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {



    private final RegisterUserRepository userRepository;

    private final ConfirmationTokenRepository confirmationTokenRepository;

    private final EmailService emailService;

    public UserController(RegisterUserRepository userRepository, ConfirmationTokenRepository confirmationTokenRepository, EmailService emailService){
        this.userRepository=userRepository;
        this.confirmationTokenRepository= confirmationTokenRepository;
        this.emailService=emailService;
    }
    @GetMapping("/another")
    public String another(){
        return "Another";
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody UserEntity userEntity) {

        UserEntity existingUser = userRepository.findByEmailIdIgnoreCase(userEntity.getEmailId());
        if(existingUser != null)
        {
            return("This email already exists!");
        }
        else
        {
            String hashedPassword = new BCryptPasswordEncoder().encode(userEntity.getPassword());
            userEntity.setPassword(hashedPassword);
            userRepository.save(userEntity);
            ConfirmationToken confirmationToken = new ConfirmationToken(userEntity);
            confirmationTokenRepository.save(confirmationToken);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(userEntity.getEmailId());
            mailMessage.setSubject("Complete Registration!");

            mailMessage.setText("To confirm your account, please click here : "
                    +"http://localhost:9192/api/user/confirm-account?token="+confirmationToken.getConfirmationToken());
            emailService.sendEmail(mailMessage);
            return ("Email has been sent");
        }


    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody UserEntity userEntity) throws NotFoundException {
        UserEntity existingUser = userRepository.findByEmailIdIgnoreCase(userEntity.getEmailId());
        try {
            if (existingUser != null) {
                ConfirmationToken userConfirmationToken = existingUser.getConfirmationToken();
                String confirmationToken = UUID.randomUUID().toString();;
                userConfirmationToken.setConfirmationToken(confirmationToken);
                confirmationTokenRepository.save(userConfirmationToken);
                existingUser.setConfirmationToken(userConfirmationToken);
                userRepository.save(existingUser);
                sendMessage(userConfirmationToken.getConfirmationToken(),userEntity.getEmailId());
                return ("Email has been sent");

            }else {
                return "User not found!";
            }
        } catch (Exception notFoundException){
            return "User not found!";
        }
    }
    @Async
    public String sendMessage(String confirmationToken, String to){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject("Password reset!");

        mailMessage.setText("To change your password, please click in link below : \n"
                +"http://localhost:9192/api/user/reset-password/page?token="+confirmationToken);
        emailService.sendEmail(mailMessage);
        return ("Email has been sent");
    }


    @GetMapping("/confirm-account")
    public ModelAndView confirmUserAccount(@RequestParam("token")String confirmationToken)
    {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
            UserEntity user = userRepository.findByEmailIdIgnoreCase(token.getUserEntity().getEmailId());
            user.setEnabled(true);
            user.setConfirmationToken(token);
            user.setGoogleAccount(false);
            userRepository.save(user);
            ModelAndView modelAndView = new ModelAndView("ConfirmationEmail");
            return modelAndView;
        }
        else
        {
            ModelAndView modelAndView = new ModelAndView("error-page");
            return modelAndView;
        }

    }
    @GetMapping("/reset-password/page")
    public ModelAndView resetPassword(@RequestParam("token") String confirmationToken) {
        ModelAndView modelAndView = new ModelAndView("reset-password"); // Name of the Thymeleaf template

        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
        if (token != null) {
            modelAndView.addObject("token", confirmationToken);
            return modelAndView;
        } else {
            modelAndView.setViewName("error-page"); // Name of the error page template
            modelAndView.addObject("message", "The link is invalid or broken!");
            return modelAndView;
        }
    }
    @GetMapping("/reset-password/confirm")
    public ModelAndView confirmResetPassword(@RequestParam("token") String confirmationToken, @RequestParam("newPassword") String newPassword) throws Exception {
            try {
                ModelAndView modelAndView = new ModelAndView("SuccessReset.html"); // Name of the Thymeleaf template
                String hashedPassword = new BCryptPasswordEncoder().encode(newPassword);
                ConfirmationToken confirmationToken1 = this.confirmationTokenRepository.findByConfirmationToken(confirmationToken);
                UserEntity entity = confirmationToken1.getUserEntity();
                entity.setPassword(hashedPassword);
                this.userRepository.save(entity);
                String lastConfirm = UUID.randomUUID().toString();
                confirmationToken1.setConfirmationToken(lastConfirm);
                confirmationTokenRepository.save(confirmationToken1);
                return modelAndView;
            } catch (Exception e){
                ModelAndView modelAndView = new ModelAndView("error-page.html");
                return modelAndView;
            }

    }


}
