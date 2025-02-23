package com.learnwithfranny.backend.controller;
import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.repository.RoleRepository;
import com.learnwithfranny.backend.model.User;
import com.amazonaws.Response;
import com.learnwithfranny.backend.model.ERole;
import com.learnwithfranny.backend.model.Role;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learnwithfranny.backend.service.BillingService;
import com.learnwithfranny.backend.service.SecurityService;
import com.learnwithfranny.backend.service.StorageService;
import com.learnwithfranny.backend.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
@RequestMapping("/apu/billing")
public class BillingController {

    @Autowired
    private BillingService billingService;

    // Retrieving all of the payment methods
    @GetMapping("/payment-methods")
    public ResponseEntity<List<Map<String, String>>> getPaymentMethods() {
        List<Map<String, String>> paymentMethods = billingService.getPaymentMethods();
        return ResponseEntity.ok(paymentMethods);
    }

    // Adding a payment method
    @PostMapping("/add-payment-method")
    public ResponseEntity<String> addPaymentMethod(@RequestBody Map<String, String> request) {
        String cardType = request.get("cardType");
        String last4 = request.get("last4");
        String expiryDate = request.get("expiryDate");

        billingService.addPaymentMethod(cardType, last4, expiryDate);
        return ResponseEntity.ok("Payment added successfully");
    }

    // Users billing history
    @GetMapping("/billing-history")
    public ResponseEntity<List<Map<String, String>>> getBillingHistory() {
        List<Map<String, String>> billingHistory = billingService.getBillingHistory();
        return ResponseEntity.ok(billingHistory);
    }
}
