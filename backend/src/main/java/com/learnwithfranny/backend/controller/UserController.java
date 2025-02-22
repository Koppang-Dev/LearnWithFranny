package com.learnwithfranny.backend.controller;
import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.repository.RoleRepository;
import com.learnwithfranny.backend.model.User;
import com.amazonaws.Response;
import com.learnwithfranny.backend.model.ERole;
import com.learnwithfranny.backend.model.Role;

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
import com.learnwithfranny.backend.service.StorageService;
import com.learnwithfranny.backend.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;


// Controller deals Users information and profile settings 
@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

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
        String name = request.get("name")
        userService.updateName(name);
        return ResponseEntity.ok("Name updated successfully");
    }

    // Updating the user email
    @PostMapping("/update-Email")
    public ResponseEntity<String> updateEmail(@RequestBody Map<String, String> request) {
        // Setting new email
        String email = request.get("email");
        return ResponseEntity.ok("Email updated successfully");
    }
    

    
    
}
