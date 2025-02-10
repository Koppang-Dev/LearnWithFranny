package com.learnwithfranny.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnwithfranny.backend.model.Card;

public interface CardRepository extends JpaRepository<Card, Long> {
}