package com.learnwithfranny.backend.exceptions;

public class CardNotFoundException extends RuntimeException {
    public CardNotFoundException(Long cardId) {
        super("Card not found with ID: " + cardId);
    }
    
}
