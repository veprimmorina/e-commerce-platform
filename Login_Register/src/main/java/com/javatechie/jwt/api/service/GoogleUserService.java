package com.javatechie.jwt.api.service;

import com.javatechie.jwt.api.entity.UserEntity;
import com.javatechie.jwt.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoogleUserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity getByEmail(String email){
        return this.userRepository.findGoogleAccount(email);
    }
}
