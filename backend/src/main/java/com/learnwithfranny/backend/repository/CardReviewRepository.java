package com.learnwithfranny.backend.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.learnwithfranny.backend.dto.DailyReviewDTO;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.CardReview;
import com.learnwithfranny.backend.model.User;

public interface CardReviewRepository extends JpaRepository<CardReview, Long> {

    // Fetching by card id and user
    Optional<CardReview> findByUserAndCard(User user, Card card);
    
    // Counting number of mastered cards per user
    long countByUserAndBucket(User user, int bucket);

    // Counting by user
    long countByUser(User user);

    // Getting review activity for specific dates and user
    @Query("SELECT new com.learnwithfranny.backend.dto.DailyReviewDTO(" +
    "FUNCTION('DATE', cr.reviewedAt), COUNT(cr)) " +
    "FROM CardReview cr " +
    "WHERE cr.user.id = :userId AND cr.reviewedAt BETWEEN :start AND :end " +
    "GROUP BY FUNCTION('DATE', cr.reviewedAt)")
List<DailyReviewDTO> getDailyReviewCounts(
 @Param("userId") Long userId,
 @Param("start") LocalDateTime start,
 @Param("end") LocalDateTime end
);
}