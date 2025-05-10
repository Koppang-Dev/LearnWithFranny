package com.learnwithfranny.backend.controller;
import com.learnwithfranny.backend.dto.CreateDeckDTO;
import com.learnwithfranny.backend.dto.DeckRequestDTO;
import com.learnwithfranny.backend.dto.DeckResponseDTO;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.CardReview;
import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.CardRepository;
import com.learnwithfranny.backend.repository.CardReviewRepository;
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
@RequestMapping("api/deck")
public class DeckController {

    @Autowired
    private DeckService deckService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CardService cardService;

    @Autowired
    private CardReviewRepository cardReviewRepository;

    @Autowired
    private CardReviewService cardReviewService;

    @Autowired
    private CardRepository cardRepository;


    // Create new Deck for a user
    @PostMapping
    public ResponseEntity<?> createDeck(@RequestBody CreateDeckDTO createDeckDTO) {

        try {
            Deck createdDeck = deckService.createDeckForUser(createDeckDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
            "message", "Deck created successfully",
            "deckId", createdDeck.getId()
        ));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create deck");
        }
    }
    
    // Get all decks for a user
    @GetMapping()
    public ResponseEntity<?> getDecks() {
        try {
            List<DeckResponseDTO> response = deckService.getDecksByUser();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching decks: " + e.getMessage());
        }
    }
    

    // Deleting a deck
    @DeleteMapping("/{deckId}")
    public ResponseEntity<String> deleteDeck(@PathVariable(name = "deckId") Long deckId) {

        try {
            deckService.deleteDeck(deckId);
            return ResponseEntity.ok("Deck Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error deleting deck: " + e.getMessage());        }
    }
    
    // Retrieve all cards for a deck
    @GetMapping("/cards/{deckId}")
    public ResponseEntity<List<Card>> getCardsFromDeck(@PathVariable(name = "deckId") Long deckId) {
        List<Card> cards = cardService.getCardsByDeck(deckId);
        return ResponseEntity.ok(cards);
    }

    // Retrieving deck by ID
    @GetMapping("/{deckId}")
    public ResponseEntity<?> getDeckById(@PathVariable(name = "deckId") Long deckId) {
        try {
            Deck deck = deckService.getDeckById(deckId);
            return ResponseEntity.ok(deck);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting deck: " + e.getMessage());
        }
    }

    // Updating a deck
    @PutMapping("/{deckId}")
    public ResponseEntity<?> updateDeck(@PathVariable("deckId") Long deckId,
            @RequestBody CreateDeckDTO deckData) {
        try {
            Deck updatedDeck = deckService.updateDeck(deckId, deckData);
            DeckResponseDTO response = new DeckResponseDTO(
                    updatedDeck.getId(),
                    updatedDeck.getName(),
                    updatedDeck.getDescription(),
                    updatedDeck.getCards().size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    // Getting Deck Progression
    @GetMapping("/progress/{deckId}")
    public ResponseEntity<?> getDeckProgress(@PathVariable("deckId") Long deckId) {
        try {
            long mastered = cardReviewService.countMasteredCards(deckId);
            long total = cardRepository.countByDeckId(deckId);
            return ResponseEntity.ok(Map.of("mastered", mastered, "total", total));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error loading progress");
        }
        
    }
    
}
