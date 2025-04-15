package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PreferencesService {

    @Autowired
    private UserRepository userRepository;

    // Get the users preferences
    public Map<String, String> getPreferences() {
        User user = getCurrentUser();

        // Use default values if preferences are null
        String language = user.getLanguage() != null ? user.getLanguage() : "en"; // Default language
        String timeZone = user.getTimeZone() != null ? user.getTimeZone() : "UTC"; // Default time zone
        String dateFormat = user.getDateFormat() != null ? user.getDateFormat() : "yyyy-MM-dd"; // Default date format

        return Map.of(
                "language", language,
                "timeZone", timeZone,
                "dateFormat", dateFormat);
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

        // Authentication Object
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Principal can be either OAuth or UserDetailsImpl
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetailsImpl userDetails) {
            // Finding by username
            String email = userDetails.getEmail();
            return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        } else if (principal instanceof OAuth2User oauth2User) {
            // Finding by email
            String email = oauth2User.getAttribute("email");
            return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        } else {
            System.out.println("Principal class: " + principal.getClass().getName());
            System.out.println("Principal: " + principal.toString());
            throw new RuntimeException("Unknown Authentication Type" + principal.getClass());
        }
    }
}
