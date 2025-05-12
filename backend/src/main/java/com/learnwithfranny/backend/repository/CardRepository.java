package com.learnwithfranny.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.User;

public interface CardRepository extends JpaRepository<Card, Long> {

    // Finding by card id and user
    Optional<Card> findById(Long id);

    // Finding by deck Id
    List<Card> findByDeckId(Long deckId);

    // Count how many cards are in a specific deck
    long countByDeckId(Long deckId);

    // Counting by cards by user
    @Query("SELECT COUNT(c) FROM Card c WHERE c.deck.user = :user")
    long countByUser(@Param("user") User user);
    

}