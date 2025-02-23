package com.learnwithfranny.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnwithfranny.backend.model.ReferralHistory;
import com.learnwithfranny.backend.model.User;

public interface ReferralHistoryRepository extends JpaRepository<ReferralHistoryRepository, Long> {
    List<ReferralHistory> findByReferrer(User referrer);

}
