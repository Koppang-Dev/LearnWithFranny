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

import com.learnwithfranny.backend.service.BillingService;
import com.learnwithfranny.backend.service.NotificationService;
import com.learnwithfranny.backend.service.SecurityService;
import com.learnwithfranny.backend.service.StorageService;
import com.learnwithfranny.backend.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Get all the notification preferences
    @GetMapping
    public ResponseEntity<Map<String, Boolean>> getNotificationPreferences() {
        Map<String, Boolean> preferences = notificationService.getNotificationPreferences();
        return ResponseEntity.ok(preferences);
    }
    
    // Updating notification preferences
    @PostMapping("/update-preferences")
    public ResponseEntity<String> updateNotificationPreferences(@RequestBody Map<String, Boolean> request) {
        notificationService.updateNotificationPreferences(request);
        return ResponseEntity.ok("Notification preferences updated successfully");
    }
    
    
}
