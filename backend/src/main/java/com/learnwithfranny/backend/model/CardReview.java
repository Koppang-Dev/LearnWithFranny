package com.learnwithfranny.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CardReview {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Card card;

    private int bucket = 0; // 0 = New, 1-3 = Learning, 4 = mastered
    private boolean wasCorrect;
    private LocalDateTime reviewedAt;

    // Default constructor (required by JPA)
    public CardReview() {}

    // Custom constructor
    public CardReview(User user, Card card) {
        this.user = user;
        this.card = card;
        this.bucket = 0;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Card getCard() {
        return card;
    }

    public int getBucket() {
        return bucket;
    }

    public boolean isWasCorrect() {
        return wasCorrect;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public void setBucket(int bucket) {
        this.bucket = bucket;
    }

    public void setWasCorrect(boolean wasCorrect) {
        this.wasCorrect = wasCorrect;
    }

    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }
}
