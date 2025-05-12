package com.learnwithfranny.backend.dto;

public class StatisticsResponseDTO {
    private long flashcardsCreated;
    private long flashcardsReviewed;
    private int studyStreak;
    private long flashcardsMastered;

    // Constructor
    public StatisticsResponseDTO(long flashcardsCreated, long flashcardsReviewed, int studyStreak, long flashcardsMastered) {
        this.flashcardsCreated = flashcardsCreated;
        this.flashcardsReviewed = flashcardsReviewed;
        this.studyStreak = studyStreak;
        this.flashcardsMastered = flashcardsMastered;
    }

    // Getters
    public long getFlashcardsCreated() {
        return flashcardsCreated;
    }

    public long getFlashcardsReviewed() {
        return flashcardsReviewed;
    }

    public int getStudyStreak() {
        return studyStreak;
    }

    public long getFlashcardsMastered() {
        return flashcardsMastered;
    }

    // Setters
    public void setFlashcardsCreated(long flashcardsCreated) {
        this.flashcardsCreated = flashcardsCreated;
    }

    public void setFlashcardsReviewed(long flashcardsReviewed) {
        this.flashcardsReviewed = flashcardsReviewed;
    }

    public void setStudyStreak(int studyStreak) {
        this.studyStreak = studyStreak;
    }

    public void setFlashcardsMastered(long flashcardsMastered) {
        this.flashcardsMastered = flashcardsMastered;
    }
}
