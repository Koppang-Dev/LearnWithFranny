package com.learnwithfranny.backend.controller;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class OAuthController {
    @GetMapping("/login/oauth2/code/google")
    public ResponseEntity<String> getOAuth2LoginInfo(Authentication authentication) {
        // You can extract user info from the Authentication object, for example:
        System.out.println("Authenticated user: " + authentication.getPrincipal());
        
        // Returning a success response
        return ResponseEntity.ok("User Registered Success");
    }
}
