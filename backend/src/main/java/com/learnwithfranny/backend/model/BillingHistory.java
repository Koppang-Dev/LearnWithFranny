package com.learnwithfranny.backend.model;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class BillingHistory {

    // Primary key ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Date of the purchase
    @Column(name = "Date", nullable = false)
    private Date date;

    // Amount of the purchase
    @Column(name = "amount")
    private double amount;

    // Status of the purchase
    @Column(name = "status")
    private String status;

    // Joining table with user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
}
