package com.learnwithfranny.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnwithfranny.backend.model.BillingHistory;

public interface BillingRepository extends JpaRepository<BillingHistory, Long> {
}