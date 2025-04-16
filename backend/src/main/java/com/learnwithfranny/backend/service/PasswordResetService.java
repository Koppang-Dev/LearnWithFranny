package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.PasswordResetToken;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;

    // @Value("${LearnWithFranny.app.resetTokenExpirationMinutes:30}")
    private int expirationInMinutes = 1200;

    public PasswordResetService(PasswordResetTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public PasswordResetToken createPasswordResetToken(User user) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(expirationInMinutes);

        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user, expiryDate);
        return tokenRepository.save(passwordResetToken);
    }

    public boolean isTokenValid(String token) {
        return tokenRepository.findByToken(token)
                .filter(t -> !t.isExpired() && !t.isUsed())
                .isPresent();
    }

    public User getUserByToken(String token) {
        return tokenRepository.findByToken(token)
                .filter(t -> !t.isExpired())
                .map(PasswordResetToken::getUser)
                .orElse(null);
    }

    public void markTokenAsUsed(String token) {
        tokenRepository.findByToken(token).ifPresent(t -> {
            t.setUsed(true);
            tokenRepository.save(t);
        });
    }
}
