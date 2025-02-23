package com.learnwithfranny.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnwithfranny.backend.model.PaymentMethod;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
}