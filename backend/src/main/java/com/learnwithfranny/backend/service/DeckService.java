package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.exceptions.UserNotFoundException;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.DeckRepository;
import com.learnwithfranny.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class DeckService {

    @Autowired
    private DeckRepository deckRepository;

    @Autowired
    private UserRepository userRepository;

    // Creating a new deck for a user
    public Deck createDeck(Long userId, Deck deck) {

        // Find the user by their id
        Optional<User> user = userRepository.findById(userId);

        // If the user does not exist - throw error
        if (user.isPresent()) {
            deck.setUser(user.get());
            return deckRepository.save(deck);
        } else {
            throw new UserNotFoundException(userId);
        }
    }

    // Getting all of a user's decks
    public List<Deck> getDecksByUser(Long userId) {
        return deckRepository.findAllByUserId(userId);
    }


    // Retrieving specific deck
    public Optional<Deck> getDeckById(Long deckId) {
        return deckRepository.findById(deckId);
    }

    // Deleting a deck
    public void deleteDeck(Long deckId) {
        deckRepository.deleteById(deckId);
    }

    // Adding a card to a deck
    public Deck addCardToDeck(Long deckId, Card card) {

        // Find the deck
        Optional<Deck> deck = deckRepository.findById(deckId);
        if (deck.isPresent()) {
            deck.get().getCards().add(card);
            return deckRepository.save(deck.get());
        }
        return null;
    }
}
