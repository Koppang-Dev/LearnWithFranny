package com.learnwithfranny.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.CardReview;
import com.learnwithfranny.backend.model.User;

public interface CardReviewRepository extends JpaRepository<CardReview, Long> {

    // Fetching by card id and user
    Optional<CardReview> findByUserAndCard(User user, Card card);
    
    // Counting number of mastered cards per user
    long countByUserAndBucket(User user, int bucket);

    // Counting by user
    long countByUser(User user);
}