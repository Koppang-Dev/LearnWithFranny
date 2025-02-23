package com.learnwithfranny.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.learnwithfranny.backend.service.NotificationService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Get all the notification preferences
    @GetMapping
    public ResponseEntity<Map<String, Object>> getNotificationPreferences() {
        Map<String, Object> preferences = notificationService.getNotificationPreferences();
        return ResponseEntity.ok(preferences);
    }
    
    // Updating notification preferences
    @PostMapping("/update-preferences")
    public ResponseEntity<String> updateNotificationPreferences(@RequestBody Map<String, Object> request) {
        notificationService.updateAllNotificationPreferences(request);
        return ResponseEntity.ok("Notification preferences updated successfully");
    }
    
    
}
