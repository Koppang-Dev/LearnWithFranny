package com.learnwithfranny.backend.service;
import com.learnwithfranny.backend.dto.MasteryBreakdownDTO;
import com.learnwithfranny.backend.dto.StatisticsResponseDTO;
import com.learnwithfranny.backend.dto.UserContextDto;
import com.learnwithfranny.backend.dto.DailyReviewDTO;
import com.learnwithfranny.backend.model.User;

import com.learnwithfranny.backend.repository.CardRepository;
import com.learnwithfranny.backend.repository.CardReviewRepository;
import com.learnwithfranny.backend.repository.UserRepository;

import io.jsonwebtoken.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private CardRepository cardRepository;

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

    // Fetching user statistics
    public StatisticsResponseDTO getUserStatistics() {
        User user = getCurrentUser();

        // Basic Metrics
        long flashcardsCreated = cardRepository.countByUser(user);
        long flashcardsReviewed = cardReviewRepository.countByUser(user);
        int studyStreak = activityService.calculateStreak(user);

        // Difficulty Breakdown
        long newCards = cardReviewRepository.countByUserAndBucket(user, 0);
        long learning = cardReviewRepository.countByUserAndBucket(user, 1);
        long reviewing = cardReviewRepository.countByUserAndBucket(user, 2)
                        + cardReviewRepository.countByUserAndBucket(user, 3);
        long mastered = cardReviewRepository.countByUserAndBucket(user, 4);
        MasteryBreakdownDTO masteryBreakdown = new MasteryBreakdownDTO(newCards, learning, reviewing, mastered);

        // Date Ranges
        LocalDate today = LocalDate.now();
        LocalDateTime startOfYear = LocalDate.of(today.getYear(), 1, 1).atStartOfDay();
        LocalDateTime endOfToday = today.atTime(23, 59, 59);
        LocalDateTime sevenDaysAgo = today.minusDays(6).atStartOfDay();
        LocalDateTime endOfYear = LocalDate.of(today.getYear(), 12, 31).atTime(23, 59, 59);

        // Fetch raw activity counts
        List<DailyReviewDTO> rawYearActivity = cardReviewRepository.getDailyReviewCounts(user.getId(), startOfYear, endOfToday);
        List<DailyReviewDTO> rawRecentWeek = cardReviewRepository.getDailyReviewCounts(user.getId(), sevenDaysAgo, endOfToday);

        // Fill in missing dates
        List<DailyReviewDTO> fullYearActivity = ActivityService.fillMissingDates(rawYearActivity, startOfYear.toLocalDate(), endOfYear.toLocalDate());
        List<DailyReviewDTO> recentWeekActivity = ActivityService.fillMissingDates(rawRecentWeek, sevenDaysAgo.toLocalDate(), endOfToday.toLocalDate());

        return new StatisticsResponseDTO(
            flashcardsCreated,
            flashcardsReviewed,
            studyStreak,
            mastered,
            masteryBreakdown,
            fullYearActivity,
            recentWeekActivity
        );
}
    
}

