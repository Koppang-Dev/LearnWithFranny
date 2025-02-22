package com.learnwithfranny.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class ReferralHistory {

    // Primary Key ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The email used with the referral
    @Column(name = "referredEmail")
    private String referredEmail;

    // Date the user was referred
    @Column(name = "dateReferred")
    private Date dateReferred;

    // Status of the referral
    @Column(name = "status")
    private String status;

    // Joining with the user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferredEmail() {
        return referredEmail;
    }

    public void setReferredEmail(String referredEmail) {
        this.referredEmail = referredEmail;
    }

    public Date getDateReferred() {
        return dateReferred;
    }

    public void setDateReferred(Date dateReferred) {
        this.dateReferred = dateReferred;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getReferrer() {
        return referrer;
    }

    public void setReferrer(User referrer) {
        this.referrer = referrer;
    }
    
}
