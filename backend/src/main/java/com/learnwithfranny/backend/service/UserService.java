package com.learnwithfranny.backend.service;
import com.learnwithfranny.backend.dto.StatisticsResponseDTO;
import com.learnwithfranny.backend.dto.UserContextDto;
import com.learnwithfranny.backend.model.CardReview;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.CardRepository;
import com.learnwithfranny.backend.repository.CardReviewRepository;
import com.learnwithfranny.backend.repository.DeckRepository;
import com.learnwithfranny.backend.repository.UserRepository;

import io.jsonwebtoken.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.UUID;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private DeckRepository deckRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CardReview cardReview;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private CardReviewRepository cardReviewRepository;

    // Updating the users profile picture
    public String updateProfilePicture(MultipartFile image) throws IOException {
        User user = getCurrentUser();

        // Generating unique file name for image
        String uniqueFileName = generateUniqueFileName(image.getOriginalFilename());

        // Uploading image to s3 storga 
        String imageUrl = storageService.uploadFile(image, uniqueFileName);

        // Delete old profile picture
        if (user.getProfilePictureUrl() != null) {
            deleteOldProfilePicture(user.getProfilePictureUrl());
        }

        // Setting the new image
        user.setProfilePictureUrl(imageUrl);
        userRepository.save(user);

        // Returning image url
        return imageUrl;
    }

    // Deleting old profile picture
    private void deleteOldProfilePicture(String oldImageUrl) {
        String oldFileName = extractFileNameFromUrl(oldImageUrl);
        storageService.deleteFile(oldFileName);
    }

    // Getting the file name
    private String extractFileNameFromUrl(String fileUrl) {
        return fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    }

    // Generating unique filename
    private String generateUniqueFileName(String originalFileName) {
        return UUID.randomUUID().toString() + "_" + originalFileName;
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

    // Getting the users contexts
    public UserContextDto getUserContext() {

        // Current user
        User user = getCurrentUser();

        // User not found
        if (user == null) {
            throw new RuntimeException("No Authenticated User Found");
        }

        UserContextDto userContext = new UserContextDto();
        userContext.setEmail(user.getEmail());
        userContext.setUsername(user.getUsername());
        userContext.setName(user.getName());
        userContext.setProfilePictureUrl(user.getProfilePictureUrl());
    
        return userContext;
    }

    public User getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the user is authenticated
        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            return null;
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Fetching user statics
    public StatisticsResponseDTO getUserStatistics() {
        User user = getCurrentUser();
        int MASTERED_BUCKET = 4;
        long flashcardsCreated = cardRepository.countByUser(user);
        long flashcardsReviewed = cardReviewRepository.countByUser(user);
        int studyStreak = activityService.calculateStreak(user);
        long mastered = cardReviewRepository.countByUserAndBucket(user, MASTERED_BUCKET);

        return new StatisticsResponseDTO(
        flashcardsCreated,
        flashcardsReviewed,
        studyStreak,
        mastered
        );




    }
}

