package com.learnwithfranny.backend.controller;
import com.learnwithfranny.backend.dto.CreateDeckDTO;
import com.learnwithfranny.backend.dto.DeckRequestDTO;
import com.learnwithfranny.backend.dto.DeckResponseDTO;
import com.learnwithfranny.backend.dto.ReviewDTO;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.service.CardReviewService;
import com.learnwithfranny.backend.service.CardService;
import com.learnwithfranny.backend.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;






@Controller
@RequestMapping("api/study")
public class StudyController {

    @Autowired
    private DeckService deckService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CardService cardService;

    @Autowired
    private CardReviewService cardReviewService;


    // Update card result
    @PostMapping("/record")
    public ResponseEntity<?> createDeck(@RequestBody ReviewDTO dto) {
        try {
            cardReviewService.recordReview(dto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update card" + e.getMessage());
        }
    }
    
}
