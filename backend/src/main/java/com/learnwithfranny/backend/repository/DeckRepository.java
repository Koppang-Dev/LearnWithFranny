package com.learnwithfranny.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.model.User;

public interface DeckRepository extends JpaRepository<Deck, Long> {

    // Find all decks by a user Id
    List<Deck> findAllByUserId(Long userId);

    // Deleting By Deck Id and user
    void deleteByIdAndUser(Long deckId, User user);
}
