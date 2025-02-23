package com.learnwithfranny.backend.service;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;

import io.jsonwebtoken.io.IOException;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storageService;

    // Updating the users profile picture
    public String updateProfilePicture(MultipartFile image) throws IOException {
        User user = getCurrentUser();

        // Saving image and getting URL
        String imageUrl = storageService.storeImage(image);

        // Setting the users profile picture
        user.setProfilePictureUrl(imageUrl);
        userRepository.save(user);

        // Returning the image URL
        return imageUrl;
    }

    // Updating the users name
    public void updateName(String name) {
        User user = getCurrentUser();
        user.setName(name);
        userRepository.save(user);
    }

    // Updating the users username
    public void updateUsername(String username) {
        User user = getCurrentUser();
        user.setUsername(username);
        userRepository.save(user);
    }

    // Updating users email
    public void updateEmail(String email) {
        User user = getCurrentUser();
        user.setEmail(email);
        userRepository.save(user);
    }

    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
