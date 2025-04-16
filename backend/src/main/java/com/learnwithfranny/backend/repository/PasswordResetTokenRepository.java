package com.learnwithfranny.backend.repository;

import com.learnwithfranny.backend.model.PasswordResetToken;
import com.learnwithfranny.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    // Searching for the token
    Optional<PasswordResetToken> findByToken(String token);

    // Deleting the token
    void deleteByUser(User user);
}
