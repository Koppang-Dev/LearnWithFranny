package com.learnwithfranny.backend.service;

import org.springframework.stereotype.Service;
import com.learnwithfranny.backend.exceptions.DeckNotFoundException;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.repository.CardRepository;
import com.learnwithfranny.backend.repository.DeckRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private DeckRepository deckRepository;

    // Creating a new card in a given deck
    public Card createCard(Long deckId, Card card) {

        // Find the deck by its ID
        Optional<Deck> deck = deckRepository.findById(deckId);

        if (deck.isPresent()) {
            card.setDeck(deck.get());
            return cardRepository.save(card);

        } else {
            throw new DeckNotFoundException(deckId);
        }
    }

    // Get all cards from a deck
    public List<Card> getCardsByDeck(Long deckId) {
        Optional<Deck> deck = deckRepository.findById(deckId);

        if (deck.isPresent()) {
            return deck.get().getCards();
        } else {
            throw new DeckNotFoundException(deckId);
        }
    }

    // Get a single card by its Id
    public Card getCardById(Long cardId) {
        return cardRepository.findById(cardId)
                .orElseThrow(() -> new com.learnwithfranny.backend.exceptions.CardNotFoundException(cardId));
    }
    
    // Delete a card
    public void deleteCard(Long cardId) {
        Optional<Card> card = cardRepository.findById(cardId);
        if (card.isPresent()) {
            cardRepository.delete(card.get());

        } else {
            throw new com.learnwithfranny.backend.exceptions.CardNotFoundException(cardId);
        }
    }

    // Updating a card
    public Card updateCard(Long cardId, Card updatedCard) {

        // Find the card by its id
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new com.learnwithfranny.backend.exceptions.CardNotFoundException(cardId));
        
        // Saving with the new information 
        card.setFrontText(updatedCard.getFrontText());
        card.setBackText(updatedCard.getBackText());
                
        return cardRepository.save(card);
    }
    
}
