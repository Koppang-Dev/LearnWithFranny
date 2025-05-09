package com.learnwithfranny.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import com.learnwithfranny.backend.dto.ReviewDTO;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.CardReview;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.CardRepository;
import com.learnwithfranny.backend.repository.CardReviewRepository;

public class CardReviewService {

    @Autowired
    UserService userService;

    @Autowired
    CardReviewRepository cardReviewRepository;

    @Autowired
    CardRepository cardRepository;

    public void recordReview(ReviewDTO dto) {

        // Fetch current user
        User user = userService.getCurrentUser();

        // Getting card
        Card card = cardRepository.findByIdAndUser(dto.getCardId(), user)
                .orElseThrow(() -> new RuntimeException("Card Not Found"));

        // Getting the card review (or creating it)
        CardReview review = cardReviewRepository.findByUserAndCard(user, card).orElse(new CardReview(user, card));

        // Update Bucket
        int currentBucket = review.getBucket();

        switch (dto.getDifficulty()) {

            // Easy
            case 2:
                review.setBucket(Math.min(currentBucket + 2, 4));
                review.setWasCorrect(true);
                break;
            // Medium
            case 1:
                review.setBucket(Math.min(currentBucket + 1, 4));
                review.setWasCorrect(true);
                break;
            case 0:
                review.setBucket(0);
                review.setWasCorrect(false);
                break;
            default:
                review.setBucket(0);
                review.setWasCorrect(false);
                break;
        }

        review.setReviewedAt(LocalDateTime.now());
        cardReviewRepository.save(review);
    }
}
