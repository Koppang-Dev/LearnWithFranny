package com.learnwithfranny.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.User;

public interface CardRepository extends JpaRepository<Card, Long> {

    // Finding by card id and user
    Optional<Card> findById(Long id);
}