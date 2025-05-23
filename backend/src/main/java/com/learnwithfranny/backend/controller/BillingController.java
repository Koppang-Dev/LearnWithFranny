package com.learnwithfranny.backend.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.learnwithfranny.backend.dto.BillingInfo;
import com.learnwithfranny.backend.model.PaymentMethod;
import com.learnwithfranny.backend.service.BillingService;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/billing")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @Autowired

    // Retrieiving all of the Billing Informaiton
    @GetMapping
    public ResponseEntity<BillingInfo> getBillingInfo() {
        BillingInfo billingInfo = billingService.getBillingInfo();
        return ResponseEntity.ok(billingInfo);
    }

    // Retrieving all of the payment methods
    @GetMapping("/payment-methods")
    public ResponseEntity<List<Map<String, String>>> getPaymentMethods() {
        List<Map<String, String>> paymentMethods = billingService.getPaymentMethods();
        return ResponseEntity.ok(paymentMethods);
    }

    // Adding a payment method
    @PostMapping("/add-payment-method")
    public ResponseEntity<Long> addPaymentMethod(@RequestBody Map<String, String> request) {
        String cardType = request.get("cardType");
        String last4 = request.get("last4");
        String expiryDate = request.get("expiryDate");

        PaymentMethod method = billingService.addPaymentMethod(cardType, last4, expiryDate);
        return ResponseEntity.ok(method.getId());
    }

    // Removing Payment Method
    @PostMapping("/remove-payment-method")
    public ResponseEntity<String> removePaymentMethod(@RequestBody Long paymentMethodId) {
        billingService.deletePaymentMethod(paymentMethodId);
        return ResponseEntity.ok("Successfully deleted payment method");
    }

    // Users billing history
    @GetMapping("/billing-history")
    public ResponseEntity<List<Map<String, String>>> getBillingHistory() {
        List<Map<String, String>> billingHistory = billingService.getBillingHistory();
        return ResponseEntity.ok(billingHistory);
    }

    // Users current subscription plan
    @GetMapping("/subscription-plan")
    public ResponseEntity<Map<String, String>> getSubscriptionPlan() {
        Map<String, String> plan = Map.of(
            "name", "Pro Plan",
            "price", "$49.99",
            "renewalDate", "2025-05-15"
        );
        return ResponseEntity.ok(plan);
    }
}
