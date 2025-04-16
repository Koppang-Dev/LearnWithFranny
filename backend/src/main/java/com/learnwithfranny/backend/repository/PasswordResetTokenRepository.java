package com.learnwithfranny.backend.repository;

import com.learnwithfranny.backend.model.PasswordResetToken;
import com.learnwithfranny.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User user);
}
