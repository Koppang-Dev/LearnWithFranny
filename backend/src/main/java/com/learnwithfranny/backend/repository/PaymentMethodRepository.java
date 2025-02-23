package com.learnwithfranny.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnwithfranny.backend.model.PaymentMethod;
import com.learnwithfranny.backend.model.User;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    List<PaymentMethod> findByUser(User user);
}