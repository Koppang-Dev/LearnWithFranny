package com.learnwithfranny.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.learnwithfranny.backend.dto.ReferralResponseDTO;
import com.learnwithfranny.backend.service.ReferralService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("api/referrals")
public class ReferralsController {

    @Autowired
    private ReferralService referralService;
    
    // Retrieiving both referral link and referral history
    @GetMapping
    public ResponseEntity<?> getReferralInformation() {

        try {
        String referralLink = referralService.getReferralLink();
        List<Map<String, String>> referralHistory = referralService.getReferralHistory();
        ReferralResponseDTO responseDTO = new ReferralResponseDTO();
        responseDTO.setReferralLink(referralLink);
        responseDTO.setReferralHistory(referralHistory);
        return ResponseEntity.ok(responseDTO);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(Map.of("error", "Issue getting referral information"));
    }
}

    // Getting a referral link
    @GetMapping("/referral-link")
    public ResponseEntity<String> getReferralLink() {
        String referralLink = referralService.getReferralLink();
        return ResponseEntity.ok(referralLink);
    }

    // Getting referral history
    @GetMapping("/referral-history")
    public ResponseEntity<List<Map<String, String>>> getReferralHistory() {
        List<Map<String, String>> referralHistory = referralService.getReferralHistory();
        return ResponseEntity.ok(referralHistory);
    }


    
}
