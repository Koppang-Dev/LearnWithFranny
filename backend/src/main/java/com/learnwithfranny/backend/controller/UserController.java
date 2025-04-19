package com.learnwithfranny.backend.controller;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learnwithfranny.backend.dto.UserContextDto;
import com.learnwithfranny.backend.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;



// Controller deals Users information and profile settings 
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;


    // Retrieves the users username and password
    @GetMapping("/user-context")
    public ResponseEntity<UserContextDto> getUserContext() {
        UserContextDto userContext = userService.getUserContext();
        return ResponseEntity.ok(userContext);
    }
    

    // Updating the users profile picture
    @PostMapping("/update-profile-picture")
    public ResponseEntity<String> updateProfilePicture(@RequestParam MultipartFile file) {

        // Saving profile picture
        String profilePictureUrl = userService.updateProfilePicture(file);
        return ResponseEntity.ok(profilePictureUrl);
    }
    
    // Updating the users name
    @PostMapping("/update-name")
    public ResponseEntity<String> updateName(@RequestBody Map<String, String> request) {

          // Setting new name
          try {
            String name = request.get("name"); 
            if (name == null || name.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Name can not be empty");
            }
            userService.updateName(name);
            return ResponseEntity.ok("Name updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to update name");
        }
    }
       

    // Updating the users username
    @PostMapping("/update-username")
    public ResponseEntity<String> updateUserName(@RequestBody Map<String, String> request) {

        // Setting new username
        try {
            String username = request.get("username"); 
            if (username == null || username.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Username can not be empty");
            }
            userService.updateUsername(username);
            return ResponseEntity.ok("Username updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to update username");
        }
    }

    // Updating the user email
    @PostMapping("/update-email")
    public ResponseEntity<String> updateEmail(@RequestBody Map<String, String> request) {


         // Setting new username
         try {
            String email = request.get("email"); 
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email can not be empty");
            }
            userService.updateEmail(email);
            return ResponseEntity.ok("Email updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to update email");
        }

    } 
}
