package com.learnwithfranny.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnwithfranny.backend.dto.ReviewDTO;
import com.learnwithfranny.backend.model.ActivityLog;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.CardReview;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.ActivityLogRepository;
import com.learnwithfranny.backend.repository.CardRepository;
import com.learnwithfranny.backend.repository.CardReviewRepository;

@Service
public class CardReviewService {

    @Autowired
    UserService userService;

    @Autowired
    CardReviewRepository cardReviewRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    ActivityService activityService;

    @Autowired
    ActivityLogRepository activityLogRepository;

    public void recordReview(ReviewDTO dto) {

        // Fetch current user
        User user = userService.getCurrentUser();

        // Getting card
        Card card = cardRepository.findById(dto.getCardId())
                .orElseThrow(() -> new RuntimeException("Card Not Found"));

        // Getting the card review (or creating it)
        CardReview review = cardReviewRepository.findByUserAndCard(user, card).orElse(new CardReview(user, card));

        // Update Bucket
        int currentBucket = review.getBucket();

        switch (dto.getDifficulty()) {

            // Easy
            case "easy":
                review.setBucket(Math.min(currentBucket + 2, 4));
                review.setWasCorrect(true);
                break;
            // Medium
            case "medium":
                review.setBucket(Math.min(currentBucket + 1, 4));
                review.setWasCorrect(true);
                break;
            case "hard":
                review.setBucket(0);
                review.setWasCorrect(false);
                break;
            default:
                review.setBucket(0);
                review.setWasCorrect(false);
                break;
        }
        activityLogRepository.save(new ActivityLog(user, "REVIEW", card.getId()));
        review.setReviewedAt(LocalDateTime.now());
        cardReviewRepository.save(review);
    }

    // Counting total of mastered cards
    public long countMasteredCards(Long deckId) {
        User user = userService.getCurrentUser();
        List<Card> deckCards = cardRepository.findByDeckId(deckId);

        // Returning the mastered count
        return deckCards.stream().map(card -> cardReviewRepository.findByUserAndCard(user, card).orElse(null))
                .filter(r -> r != null && r.getBucket() == 4).count();
    }
}
