package com.learnwithfranny.backend.dto;

import java.util.List;

public class GeneratedDeckDTO {
    private String title;
    private String description;
    private List<FlashcardDTO> flashcards;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<FlashcardDTO> getFlashcards() { return flashcards; }
    public void setFlashcards(List<FlashcardDTO> flashcards) { this.flashcards = flashcards; }
}
