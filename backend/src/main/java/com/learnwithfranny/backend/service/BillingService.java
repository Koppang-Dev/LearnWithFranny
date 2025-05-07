package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.dto.BillingInfo;
import com.learnwithfranny.backend.model.PaymentMethod;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.PaymentMethodRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class BillingService {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;


    // Retrieving the combined payment methods and billing history
    public BillingInfo getBillingInfo() {
        List<Map<String, String>> paymentMethods = getPaymentMethods();
        List<Map<String, String>> billingHistory = getBillingHistory();

        // Combining
        return new BillingInfo(paymentMethods, billingHistory);

    }


    // Add a payment method
    public PaymentMethod addPaymentMethod(String cardType, String last4, String expiryDate) {
        User user = userService.getCurrentUser();
        PaymentMethod paymentMethod = new PaymentMethod(cardType, last4, expiryDate, user);
        return paymentMethodRepository.save(paymentMethod);
    }


    // Deleting a payment method
    @Transactional
    public void deletePaymentMethod(Long paymentMethodId) {
        User user = userService.getCurrentUser();
        paymentMethodRepository.deleteByIdAndUser(paymentMethodId, user);
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
                        "id", Objects.toString(paymentMethod.getId(), ""),
                        "cardType", Objects.toString(paymentMethod.getCardType(), ""),
                        "last4", Objects.toString(paymentMethod.getLast4(), ""),
                        "expiryDate", Objects.toString(paymentMethod.getExpiryDate(), "")
                ))
                .collect(Collectors.toList());
    }    
}
