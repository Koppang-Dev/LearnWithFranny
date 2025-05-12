package com.learnwithfranny.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class DailyReviewDTO {
    private LocalDate date;
    private long count;

    public DailyReviewDTO(LocalDateTime dateTime, long count) {
        this.date = dateTime.toLocalDate();
        this.count = count;
    }

    public DailyReviewDTO(LocalDate date, long count) {
        this.date = date;
        this.count = count;
    }

    public DailyReviewDTO(Object rawDate, Long count) {
        if (rawDate instanceof java.sql.Date) {
            this.date = ((java.sql.Date) rawDate).toLocalDate();
        } else if (rawDate instanceof LocalDate) {
            this.date = (LocalDate) rawDate;
        } else if (rawDate instanceof LocalDateTime) {
            this.date = ((LocalDateTime) rawDate).toLocalDate();
        } else {
            throw new IllegalArgumentException("Unsupported date type: " + rawDate.getClass());
        }
    
        this.count = count != null ? count : 0L;
    }

    public LocalDate getDate() {
        return date;
    }

    public long getCount() {
        return count;
    }
}
