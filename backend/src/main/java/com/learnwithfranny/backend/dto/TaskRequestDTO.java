package com.learnwithfranny.backend.dto;

import java.time.LocalDate;

public class TaskRequestDTO {
    private String title;
    private LocalDate date;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
