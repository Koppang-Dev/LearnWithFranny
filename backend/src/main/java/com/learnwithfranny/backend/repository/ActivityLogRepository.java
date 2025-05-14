package com.learnwithfranny.backend.repository;

import com.learnwithfranny.backend.model.ActivityLog;
import com.learnwithfranny.backend.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    @Query("SELECT DISTINCT DATE(a.timestamp) FROM ActivityLog a WHERE a.user = :user AND a.type = 'REVIEW' ORDER BY DATE(a.timestamp) DESC")
    List<java.sql.Date>  findDistinctReviewDates(@Param("user") User user);


    long countByUserAndType(User user, String type);
}