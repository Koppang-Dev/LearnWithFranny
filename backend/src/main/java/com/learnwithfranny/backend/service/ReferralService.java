package com.learnwithfranny.backend.service;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learnwithfranny.backend.model.ReferralHistory;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.ReferralHistoryRepository;
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
public class ReferralService {

    @Autowired
    private UserRepository userRepository;

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
