
package com.learnwithfranny.backend.controller;
import java.util.Map;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.learnwithfranny.backend.dto.ContactRequest;
import com.learnwithfranny.backend.service.EmailService;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private EmailService emailService;

    // Send Email
    @PostMapping()
    public ResponseEntity<?> sendContactEmail(@RequestBody ContactRequest request) {
        // Send Email
        try {
            emailService.sendContactEmail(request.getName(), request.getEmail(), request.getMessage());
            return ResponseEntity.ok("Message Sent!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to send message");
        }
    }
}
