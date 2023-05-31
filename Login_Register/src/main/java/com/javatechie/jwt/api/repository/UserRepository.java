package com.javatechie.jwt.api.repository;

import com.javatechie.jwt.api.entity.User;
import com.javatechie.jwt.api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Integer> {

        @Query(value = "select top 1 * from user_tbl where user_name=:username", nativeQuery = true)
        User findByUserName(@Param("username") String username);

        @Query(value = "select top 1 * from users where email_id=:email", nativeQuery = true)
        UserEntity findGoogleAccount(@Param("email") String username);


}
