package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PreferencesService {

    @Autowired
    private UserRepository userRepository;

    // Get the users preferences
    public Map<String, String> getPreferences() {
        User user = getCurrentUser();

        // Returning MAP of the preferences
        return Map.of(
                "language", user.getLanguage(),
                "timeZone", user.getTimeZone(),
                "dateFormat", user.getDateFormat());
    }
    
    // Updating the users language preference
    public void updateLanguage(String language) {
        User user = getCurrentUser();
        user.setLanguage(language);
        userRepository.save(user);
    }

    // Setting timezone preference
    public void updateTimeZone(String timeZone) {
        User user = getCurrentUser();
        user.setTimeZone(timeZone);
        userRepository.save(user);
    }

    // Setting Dataformat preference
    public void updateDateTime(String dateTime) {
        User user = getCurrentUser();
        user.setDateFormat(dateTime);
        userRepository.save(user);
    }

    // Getting the current active user
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
