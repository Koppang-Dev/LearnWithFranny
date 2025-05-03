package com.learnwithfranny.backend.dto;

import java.util.List;
import java.util.Map;

public class ReferralResponseDTO {
    private String referralLink;
    private List<Map<String, String>> referralHistory;

    // Getters and Setters
    public String getReferralLink() {
        return referralLink;
    }

    public void setReferralLink(String referralLink) {
        this.referralLink = referralLink;
    }

    public List<Map<String, String>> getReferralHistory() {
        return referralHistory;
    }

    public void setReferralHistory(List<Map<String, String>> referralHistory) {
        this.referralHistory = referralHistory;
    }
}
