package com.learnwithfranny.backend.controller;

import com.learnwithfranny.backend.dto.ReviewDTO;

import com.learnwithfranny.backend.service.CardReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;







@Controller
@RequestMapping("api/study")
public class StudyController {
    @Autowired
    private CardReviewService cardReviewService;


    // Update card result
    @PostMapping("/record")
    public ResponseEntity<?> createDeck(@RequestBody ReviewDTO dto) {
        try {
            cardReviewService.recordReview(dto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update card" + e.getMessage());
        }
    }
}
