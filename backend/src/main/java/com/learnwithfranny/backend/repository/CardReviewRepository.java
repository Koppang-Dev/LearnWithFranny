package com.learnwithfranny.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.CardReview;
import com.learnwithfranny.backend.model.User;

public interface CardReviewRepository extends JpaRepository<CardReview, Long> {

    // Fetching by card id and user
    Optional<CardReview> findByUserAndCard(User user, Card card);  
}