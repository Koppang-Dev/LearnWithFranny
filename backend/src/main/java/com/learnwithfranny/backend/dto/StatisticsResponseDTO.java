package com.learnwithfranny.backend.dto;

import java.util.List;

public class StatisticsResponseDTO {

    private long flashcardsCreated;
    private long flashcardsReviewed;
    private int studyStreak;
    private long flashcardsMastered;

    private MasteryBreakdownDTO masteryBreakdown;
    private List<DailyReviewDTO> yearActivity;
    private List<DailyReviewDTO> recentWeekActivity;

    public StatisticsResponseDTO(
        long flashcardsCreated,
        long flashcardsReviewed,
        int studyStreak,
        long flashcardsMastered,
        MasteryBreakdownDTO masteryBreakdown,
        List<DailyReviewDTO> yearActivity,
        List<DailyReviewDTO> recentWeekActivity
    ) {
        this.flashcardsCreated = flashcardsCreated;
        this.flashcardsReviewed = flashcardsReviewed;
        this.studyStreak = studyStreak;
        this.flashcardsMastered = flashcardsMastered;
        this.masteryBreakdown = masteryBreakdown;
        this.yearActivity = yearActivity;
        this.recentWeekActivity = recentWeekActivity;
    }

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

    public MasteryBreakdownDTO getMasteryBreakdown() {
        return masteryBreakdown;
    }

    public List<DailyReviewDTO> getYearActivity() {
        return yearActivity;
    }

    public List<DailyReviewDTO> getRecentWeekActivity() {
        return recentWeekActivity;
    }
}
