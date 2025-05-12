package com.learnwithfranny.backend.dto;

public class MasteryBreakdownDTO {
    private long newCards;
    private long learning;
    private long reviewing;
    private long mastered;

    public MasteryBreakdownDTO(long newCards, long learning, long reviewing, long mastered) {
        this.newCards = newCards;
        this.learning = learning;
        this.reviewing = reviewing;
        this.mastered = mastered;
    }

    public long getNewCards() {
        return newCards;
    }

    public long getLearning() {
        return learning;
    }

    public long getReviewing() {
        return reviewing;
    }

    public long getMastered() {
        return mastered;
    }
}
