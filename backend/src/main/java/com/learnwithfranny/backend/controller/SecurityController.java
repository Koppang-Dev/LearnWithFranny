package com.learnwithfranny.backend.controller;
import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.repository.RoleRepository;
import com.learnwithfranny.backend.model.User;
import com.amazonaws.Response;
import com.learnwithfranny.backend.model.ERole;
import com.learnwithfranny.backend.model.Role;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learnwithfranny.backend.service.SecurityService;
import com.learnwithfranny.backend.service.StorageService;
import com.learnwithfranny.backend.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    // Enable/Disable 2-factor authentication
    @PostMapping("/toggle-2fa")
    public ResponseEntity<String> toggle2fa(@RequestBody Map<String, Boolean> request) {
        boolean enable = request.get("enable");
        securityService.toggle2da(enable);
        return ResponseEntity.ok("Two Factor Authentication Updated");
    }

    // Get active sessions
    @GetMapping("/active-sessions")
    public ResponseEntity<List<Map<String, String>>> getActiveSessions() {
        List<Map<String, String>> sessions = securityService.getActiveSessions();
        return ResponseEntity.ok(sessions);
    }

    // Log out from a session
    @PostMapping("/logout-session")
    public ResponseEntity<String> logoutSession(@RequestBody Map<String, String> request) {
        String sessionId = request.get("sessionId");
        securityService.logoutSession(sessionId);
        return ResponseEntity.ok("Session logged out successfully");
    }
    
    
    
}
