package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.SessionRepository;
import com.learnwithfranny.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SecurityService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserService userService;

    // Getting all of the security settings
    public Map<String, Object> getSecuritySettings() {
        User user = userService.getCurrentUser();

        // Get TFA Settings
        boolean is2faEnabled = user.getTwoFactorAuthentication();
        LocalDateTime lastPasswordChanged = user.getPasswordChangedAt();

        // Get Active Sessions
        List<Map<String, String>> activeSessions = getActiveSessions(user);

        // Constructing map for security settings
        Map<String, Object> securitySettings = new HashMap<>();
        securitySettings.put("passwordChangedAt", lastPasswordChanged);
        securitySettings.put("twoFactorEnabled", is2faEnabled);
        securitySettings.put("activeSessions", activeSessions);

        // Returning the settings
        return securitySettings;

    }

    // Toggle the 2FA on and off
    public void toggle2fa() {
        User user = userService.getCurrentUser();
        user.setTwoFactorAuthentication(!user.getTwoFactorAuthentication());
        userRepository.save(user);
    }

     // Get active sessions
     public List<Map<String, String>> getActiveSessions(User user) {
         // Fetching all session information
         return sessionRepository.findByUser(user).stream().filter(session -> !session.isRevoked())
                 .map(session -> Map.of(
                         "device", session.getDeviceName(),
                         "location", session.getLocation(),
                         "lastActive", session.getLastActiveAt().toString()))
                 .toList();
     }
   
    
     //  Logout a users sessions
     public void logoutSession(String sessionId) {
     }
}
