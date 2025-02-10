package com.learnwithfranny.backend.exceptions;

public class DeckNotFoundException extends RuntimeException {
    public DeckNotFoundException(Long deckId) {
        super("Card not found with ID: " + deckId);
    }
    
}
