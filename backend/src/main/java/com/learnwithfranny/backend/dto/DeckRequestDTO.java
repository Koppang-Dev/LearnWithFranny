package com.learnwithfranny.backend.dto;
import java.util.List;
import com.learnwithfranny.backend.dto.CreateDeckDTO.CardDTO;
public class DeckRequestDTO {
    private String name;
    private String description;
    private List<CardDTO> cards;

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter and Setter for cards
    public List<CardDTO> getCards() {
        return cards;
    }

    public void setCards(List<CardDTO> cards) {
        this.cards = cards;
    }
}
