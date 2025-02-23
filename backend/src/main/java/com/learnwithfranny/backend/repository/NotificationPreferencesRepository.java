package com.learnwithfranny.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnwithfranny.backend.model.NotificationPreferences;
import com.learnwithfranny.backend.model.User;

public interface NotificationPreferencesRepository extends JpaRepository<NotificationPreferences, Long> {
    Optional<NotificationPreferences> findByUser(User user);
}