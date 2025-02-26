package com.learnwithfranny.backend.controller;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.learnwithfranny.backend.service.SecurityService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    // Getting all of the security data
    @GetMapping
    public ResponseEntity<Map<String, String>> getSecuritySettings() {
        Map<String, String> preferences = securityService.getSecuritySettings();
        return ResponseEntity.ok(preferences);
    }

    // Enable/Disable 2-factor authentication
    @PostMapping("/toggle-2fa")
    public ResponseEntity<String> toggle2fa(@RequestBody Map<String, Boolean> request) {
        boolean enable = request.get("enable");
        securityService.toggle2fa(enable);
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
