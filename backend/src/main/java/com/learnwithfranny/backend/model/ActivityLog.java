package com.learnwithfranny.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @Column(nullable = false)
    private String type; // e.g., "REVIEW", "CREATE_CARD", "COMPLETE_QUIZ", etc.

    @Column
    private Long referenceId; 

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public ActivityLog() {}

    public ActivityLog(User user, String type, Long referenceId) {
        this.user = user;
        this.type = type;
        this.referenceId = referenceId;
        this.timestamp = LocalDateTime.now();
    }
}
