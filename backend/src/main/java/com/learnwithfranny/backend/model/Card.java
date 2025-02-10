package com.learnwithfranny.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cardNumber", nullable = false)
    private int cardNumber;

    // Card's front text
    @Column(name = "frontText", nullable = false, length = 255)
    private String frontText;

    // Cards back text
    @Column(name = "backText", nullable = false, length = 255)
    private String backText;

    // Relationship with deck
    @ManyToOne
    @JoinColumn(name = "deckId")
    private Deck deck;

    public Card() {}

    public Card(int cardNumber, String frontText, String backText, Deck deck) {
        this.cardNumber = cardNumber;
        this.frontText = frontText;
        this.backText = backText;
        this.deck = deck;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Deck getDeck() {
        return deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }



    
}
