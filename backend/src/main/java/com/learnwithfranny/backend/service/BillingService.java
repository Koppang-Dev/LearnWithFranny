package com.learnwithfranny.backend.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learnwithfranny.backend.model.PaymentMethod;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.BillingRepository;
import com.learnwithfranny.backend.repository.PaymentMethodRepository;
import com.learnwithfranny.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;


    // Add a payment method
    public void addPaymentMethod(String cardType, String last4, String expiryDate) {
        User user = userService.getCurrentUser();
        PaymentMethod paymentMethod = new PaymentMethod(cardType, last4, expiryDate, user);
        paymentMethodRepository.save(paymentMethod);
    }

    // Getting the billing history
    public List<Map<String, String>> getBillingHistory() {
        return List.of(
                Map.of("date", "2023-10-01", "amount", "$49.99", "status", "Paid"),
                Map.of("date", "2023-09-01", "amount", "$49.99", "status", "Paid"));
    }

    // Get payment methods
    public List<Map<String, String>> getPaymentMethods() {
        User user = userService.getCurrentUser();
        List<PaymentMethod> paymentMethods = paymentMethodRepository.findByUser(user);

        return paymentMethods.stream()
                .map(paymentMethod -> Map.of(
                        "id", paymentMethod.getId().toString(),
                        "cardType", paymentMethod.getCardType(),
                        "last4", paymentMethod.getLast4(),
                        "expiryDate", paymentMethod.getExpiryDate()
                ))
                .collect(Collectors.toList());
    }

    


    
}
