package com.learnwithfranny.backend.dto;

public class DeckResponseDTO {

    private Long id;
    private String name;
    private String description;
    private int cardCount; 

    public DeckResponseDTO() {
    }

    public DeckResponseDTO(Long id, String name, String description, int cardCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cardCount = cardCount;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getCardCount() {
        return cardCount;
    }

    public void setCardCount(int cardCount) {
        this.cardCount = cardCount;
    }
}
