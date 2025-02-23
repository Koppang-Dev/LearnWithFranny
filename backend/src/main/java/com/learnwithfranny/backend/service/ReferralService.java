package com.learnwithfranny.backend.service;
import com.learnwithfranny.backend.model.ReferralHistory;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.ReferralHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReferralService {


    @Autowired
    private UserService userService;

    @Autowired
    private ReferralHistoryRepository referralHistoryRepository;

    // Getting a referral link
    public String getReferralLink() {
        User user = userService.getCurrentUser();

        return "https://example.com/refer/" + user.getReferralCode();
    }

    // Getting referral history
    public List<Map<String, String>> getReferralHistory() {
        User user = userService.getCurrentUser();

        List<ReferralHistory> referralHistory = referralHistoryRepository.findByReferrer(user);

        //  Returning the collection 
        return referralHistory.stream()
                .map(referral -> Map.of(
                        "referredEmail", referral.getReferredEmail(),
                        "dateReferred", referral.getDateReferred().toString(),
                        "status", referral.getStatus()
                ))
                .collect(Collectors.toList());
    }
    
}
