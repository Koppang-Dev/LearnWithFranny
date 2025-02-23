package com.learnwithfranny.backend.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SecurityService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

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
