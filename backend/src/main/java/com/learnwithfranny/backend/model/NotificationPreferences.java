package com.learnwithfranny.backend.model;
import jakarta.persistence.*;


@Entity
public class NotificationPreferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Determines which notifications they have subscribed to

    @Column(name = "emailNews")
    private boolean emailNews;

    @Column(name = "emailUpdates")
    private boolean emailUpdates;

    @Column(name = "emailReminders")
    private boolean emailReminders;

    @Column(name = "pushNews")
    private boolean pushNews;

    @Column(name = "pushUpdates")
    private boolean pushUpdates;

    @Column(name = "pushReminders")
    private boolean pushReminders;

    @Column(name = "notificationFrequency")
    private String notificationFrequency;

    // Joining table with user
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isEmailNews() {
        return emailNews;
    }

    public void setEmailNews(boolean emailNews) {
        this.emailNews = emailNews;
    }

    public boolean isEmailUpdates() {
        return emailUpdates;
    }

    public void setEmailUpdates(boolean emailUpdates) {
        this.emailUpdates = emailUpdates;
    }

    public boolean isEmailReminders() {
        return emailReminders;
    }

    public void setEmailReminders(boolean emailReminders) {
        this.emailReminders = emailReminders;
    }

    public boolean isPushNews() {
        return pushNews;
    }

    public void setPushNews(boolean pushNews) {
        this.pushNews = pushNews;
    }

    public boolean isPushUpdates() {
        return pushUpdates;
    }

    public void setPushUpdates(boolean pushUpdates) {
        this.pushUpdates = pushUpdates;
    }

    public boolean isPushReminders() {
        return pushReminders;
    }

    public void setPushReminders(boolean pushReminders) {
        this.pushReminders = pushReminders;
    }

    public String getNotificationFrequency() {
        return notificationFrequency;
    }

    public void setNotificationFrequency(String notificationFrequency) {
        this.notificationFrequency = notificationFrequency;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
}
