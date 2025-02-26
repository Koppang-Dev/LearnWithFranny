package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SecurityService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Getting all of the security settings
    public Map<String, String> getSecuritySettings() {
        User user = userService.getCurrentUser();

        // Get TFA Settings
        boolean is2faEnabled = user.getTwoFactorAuthentication();

        // Get Active Sessions
        List<Map<String, String>> activeSessions = getActiveSessions();

        // Constructing map for security settings
        Map<String, String> securitySettings = new HashMap<>();
        securitySettings.put("twoFactorEnabled", String.valueOf(is2faEnabled));
        securitySettings.put("activteSessions", activeSessions.toString());

        // Returning the settings
        return securitySettings;

    }

    // Toggle the 2FA on and off
    public void toggle2fa(boolean enable) {
        User user = userService.getCurrentUser();
        user.setTwoFactorAuthentication(enable);
        userRepository.save(user);
    }

     // Get active sessions (mock implementation)
     public List<Map<String, String>> getActiveSessions() {
         // Fetch active sessions from the database or session store
         return List.of(
                 Map.of("device", "Chrome on Windows", "location", "New York, USA", "lastActive", "2 hours ago"),
                 Map.of("device", "Safari on iPhone", "location", "San Francisco, USA", "lastActive", "5 hours ago"));
     }
    
     //  Logout a users sessions
     public void logoutSession(String sessionId) {
         // TODO: Implement this logic
     }
}
