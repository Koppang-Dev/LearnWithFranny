package com.learnwithfranny.backend.dto;

import java.util.List;
import java.util.Map;

// Contains the payment methods and the billing history
public class BillingInfo {

    private List<Map<String, String>> paymentMethods;
    private List<Map<String, String>> billingHistory;

    // Constructor
    public BillingInfo(List<Map<String, String>> paymentMethods, List<Map<String, String>> billingHistory) {
        this.paymentMethods = paymentMethods;
        this.billingHistory = billingHistory;
    }

    // Getters
    public List<Map<String, String>> getPaymentMethods() {
        return paymentMethods;
    }

    public List<Map<String, String>> getBillingHistory() {
        return billingHistory;
    }

    
}
