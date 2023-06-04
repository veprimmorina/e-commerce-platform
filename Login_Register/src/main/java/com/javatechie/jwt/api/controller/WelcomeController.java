package com.javatechie.jwt.api.controller;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.javatechie.jwt.api.entity.AuthRequest;
import com.javatechie.jwt.api.entity.GoogleAuthenticationRequest;
import com.javatechie.jwt.api.entity.UserEntity;
import com.javatechie.jwt.api.repository.RegisterUserRepository;
import com.javatechie.jwt.api.service.CustomUserDetailsService;
import com.javatechie.jwt.api.service.GoogleUserService;
import com.javatechie.jwt.api.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.json.jackson2.JacksonFactory;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Principal;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")

public class WelcomeController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private GoogleUserService googleUserService;
    @Autowired
    private RegisterUserRepository userRepository;


    @GetMapping("/")
    public String welcome() {
        return "Welcome to javatechie !!";
    }


    private String generateJwtToken(String email) {
        // Set the expiration time for the JWT token (e.g., 1 hour from the current time)
        long expirationTimeMillis = System.currentTimeMillis() + (60 * 60 * 1000);

        // Generate the JWT token
        String jwtToken = Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(expirationTimeMillis))
                .signWith(SignatureAlgorithm.HS512, "your-secret-key") // Replace "your-secret-key" with your actual secret key for signing the token
                .compact();

        return jwtToken;
    }
    @GetMapping("/user")
    public Principal user(Principal principal){
        System.out.println("Username: "+principal.getName());
        return principal;
    }

    @GetMapping("/decode")
    public ResponseEntity<?> decodeJwt(@RequestParam("jwtToken") String jwtToken) {
        Claims claims = jwtUtil.extractAllClaims(jwtToken);
        Map<String , Object> response = new HashMap<>();
        response.put("name", claims.get("name"));
        response.put("lastName",claims.get("lastName"));
        response.put("sub", claims.getSubject());
        response.put("exp", claims.getExpiration());
        // Do something with the claims
        return ResponseEntity.ok(claims);
        // Do something with the claims
    }


    @PostMapping("/authenticate/google")
    public ResponseEntity<String> authenticateWithGoogle(@RequestBody GoogleAuthenticationRequest request) {
        String tokenId = request.getTokenId();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList("72576189908-43qghbvlensshkv946a7qrv7oil5ffhs.apps.googleusercontent.com"))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(tokenId);
            if (idToken != null) {
                Payload payload = idToken.getPayload();
                UserEntity user=this.userRepository.findByUserName(payload.getEmail());

                System.out.println(payload.getEmail());

                if(user==null){
                    String firstName=(String) payload.get("given_name");
                    String lastName = (String) payload.get("family_name");
                    UserEntity userEntity = new UserEntity();
                    userEntity.setGoogleAccount(true);
                    userEntity.setConfirmationToken(null);
                    userEntity.setEnabled(true);
                    userEntity.setPassword(null);
                    userEntity.setEmailId(payload.getEmail());
                    userEntity.setFirstName(firstName);
                    userEntity.setLastName(lastName);
                    this.userRepository.save(userEntity);
                    String jwtToken = generateJwtToken(payload.getEmail());
                    return ResponseEntity.ok(jwtToken);

                }
                else if(user.isGoogleAccount()==true){
                    String jwtToken = jwtUtil.generateToken(user.getEmailId(), user.getFirstName(), user.getLastName(), user.getRole());
                    return ResponseEntity.ok(jwtToken);
                }else{
                    return ResponseEntity.ok("You should try to log in with your Samsung account");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google ID token.");
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during Google authentication.");
        }
    }


    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        System.out.println(authRequest.getUserName()+authRequest.getPassword());
        UserEntity userEntity;
        try {
            UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(authRequest.getUserName());
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


            if (!passwordEncoder.matches(authRequest.getPassword(), userDetails.getPassword())) {
                throw new Exception("Invalid username/password");
            }

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), userDetails.getPassword())
            );

            userEntity = this.userRepository.findByUserName(authRequest.getUserName());

            if(userEntity.getRole()==1){
                throw new Exception("Invalid username/password");
            }

        } catch (Exception ex) {

            throw new Exception("inavalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getUserName(), userEntity.getFirstName(), userEntity.getLastName(), userEntity.getRole());
    }

    @PostMapping("/authenticate/admin")
    public String generateAdminToken(@RequestBody AuthRequest authRequest) throws Exception {
        System.out.println(authRequest.getUserName()+authRequest.getPassword());
        UserEntity userEntity;
        try {
            UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(authRequest.getUserName());


            if (!(authRequest.getPassword().equals( userDetails.getPassword()))) {
                throw new Exception("Invalid username/password");
            }

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), userDetails.getPassword())
            );

            userEntity = this.userRepository.findByUserName(authRequest.getUserName());

            if (userEntity.getRole()==0){
                throw new Exception("Invalid username/password");
            }

        } catch (Exception ex) {

            throw new Exception("inavalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getUserName(), userEntity.getFirstName(), userEntity.getLastName(), userEntity.getRole());
    }


}
