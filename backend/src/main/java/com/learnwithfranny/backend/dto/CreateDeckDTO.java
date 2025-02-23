package com.learnwithfranny.backend.dto;


import java.util.List;

public class CreateDeckDTO {

    private Long userId;
    private String name;
    private String description;
    private List<CardDTO> cards;  // Add a list of CardDTO objects

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CardDTO> getCards() {
        return cards;
    }

    public void setCards(List<CardDTO> cards) {
        this.cards = cards;
    }

    // CardDTO class to represent individual card data
    public static class CardDTO {
        private int cardNumber;
        private String frontText;
        private String backText;

        // Getters and Setters
        public int getCardNumber() {
            return cardNumber;
        }

        public void setCardNumber(int cardNumber) {
            this.cardNumber = cardNumber;
        }

        public String getFrontText() {
            return frontText;
        }

        public void setFrontText(String frontText) {
            this.frontText = frontText;
        }

        public String getBackText() {
            return backText;
        }

        public void setBackText(String backText) {
            this.backText = backText;
        }
    }
}
