package com.learnwithfranny.backend.dto;

public class ReviewDTO {
    private Long cardId;
    private String difficulty;

    // Setters and Getters
    public Long getCardId() {
        return cardId;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }
}
