package com.learnwithfranny.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.ActivityLogRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    // Calculating user streak
    public int calculateStreak(User user) {
        List<LocalDate> dates = activityLogRepository.findDistinctReviewDates(user);
        if (dates.isEmpty()) {
            return 0;
        }

        LocalDate today = LocalDate.now();
        int streak = 0;
        for (LocalDate date : dates) {
            if (date.equals(today.minusDays(streak))) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }
    
}
