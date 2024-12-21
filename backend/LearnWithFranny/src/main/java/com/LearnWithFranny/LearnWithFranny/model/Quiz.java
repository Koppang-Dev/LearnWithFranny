package com.LearnWithFranny.LearnWithFranny.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;

@Document("Quiz")
public class Quiz {

    @Id
    private String id;

    private String title; // Title of the quiz
    private List<QuizQuestion> questions; // List of questions in the quiz
    private Date createdAt; // Timestamp when the quiz was created
    private Date updatedAt; // Timestamp for when the quiz was last updated
    private String createdBy; // Who created the quiz (AI or User)
    
    // Constructor for manually created quizzes
    public Quiz(String title, List<QuizQuestion> questions, String createdBy) {
        this.title = title;
        this.questions = questions;
        this.createdBy = createdBy;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<QuizQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuizQuestion> questions) {
        this.questions = questions;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
