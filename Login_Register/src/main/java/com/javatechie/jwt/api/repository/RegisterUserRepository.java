package com.javatechie.jwt.api.repository;

import com.javatechie.jwt.api.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("RegisterUserRepository")
public interface RegisterUserRepository extends CrudRepository<UserEntity, String> {

    UserEntity findByEmailIdIgnoreCase(String emailId);

    @Query(value = "  select top 1 * from users where email_id=:username and is_enabled=1", nativeQuery = true)
    UserEntity findByUserName(@Param("username") String username);



}
