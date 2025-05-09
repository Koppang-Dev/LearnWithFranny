package com.learnwithfranny.backend.model;
import jakarta.persistence.*;


// This class saves all of the users saved payments methods
@Entity
public class PaymentMethod {

    // Primary Key ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Users card type
    @Column(name = "cardType")
    private String cardType;

    // Users last 4 digits of their card
    @Column(name= "last4")
    private String last4;

    // Saving the users card expirary data
    @Column(name = "expiryDate")
    private String expiryDate;

    // Mapping to user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    // Constructor
    public PaymentMethod() {
    }
    
    public PaymentMethod(String cardType, String last4, String expiryDate, User user) {
        this.cardType = cardType;
        this.last4 = last4;
        this.expiryDate = expiryDate;
        this.user = user;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getLast4() {
        return last4;
    }

    public void setLast4(String last4) {
        this.last4 = last4;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiry(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
