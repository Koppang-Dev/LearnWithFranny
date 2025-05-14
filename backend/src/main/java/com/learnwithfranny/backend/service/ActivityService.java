package com.learnwithfranny.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learnwithfranny.backend.dto.DailyReviewDTO;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.ActivityLogRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    // Calculating user streak
    public int calculateStreak(User user) {
        List<LocalDate> dates = activityLogRepository
        .findDistinctReviewDates(user)
        .stream()
        .map(java.sql.Date::toLocalDate)  
                .collect(Collectors.toList());
        
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

 // Getting Days active over the past year
public static List<DailyReviewDTO> fillMissingDates(
    List<DailyReviewDTO> rawData,
    LocalDate startDate,
    LocalDate endDate
) {
    Map<LocalDate, Long> map = rawData.stream()
        .collect(Collectors.toMap(DailyReviewDTO::getDate, DailyReviewDTO::getCount));

    List<DailyReviewDTO> filled = new ArrayList<>();
    for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
        long count = map.getOrDefault(date, 0L);
        filled.add(new DailyReviewDTO(date, count));
    }

    return filled;
}

    
}
