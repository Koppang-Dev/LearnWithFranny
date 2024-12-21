package com.LearnWithFranny.LearnWithFranny.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;

@Document("Note")
public class Note {

    @Id
    private String id;
    private String front; // Name or title on the front of the card
    private String back; // Definition or answer on the back of the card
    private List<String> categories; // List of categories the note belongs to (e.g., ['Math', 'Algebra'])
    private Date createdAt; // Timestamp when the note was created
    private Date updatedAt; // Timestamp for when the note was last updated

    public Note(String front, String back, List<String> categories) {
        this.front = front;
        this.back = back;
        this.categories = categories;
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

    public String getFront() {
        return front;
    }

    public void setFront(String front) {
        this.front = front;
    }

    public String getBack() {
        return back;
    }

    public void setBack(String back) {
        this.back = back;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
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
}
