package com.learnwithfranny.backend.controller;
import com.amazonaws.Response;
import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@Controller
@RequestMapping("api/{userId}/deck")
public class DeckController {

    @Autowired
    private DeckService deckService;

    // Create new Deck for a user
    @PostMapping
    public ResponseEntity<Deck> createDeck(@PathVariable Long userId, @RequestBody Deck deck) {
        Deck createdDeck = deckService.createDeck(userId, deck);
        return ResponseEntity.status(201).body(createdDeck);
    }
    
    // Get all decks for a user
    @GetMapping
    public ResponseEntity<List<Deck>> getDecks(@PathVariable Long userId) {
        List<Deck> decks = deckService.getDecksByUser(userId);
        return ResponseEntity.ok(decks);
    }

    // Deleting a deck
    @DeleteMapping("/{deckId}")
    public ResponseEntity<Void> deleteDeck(@PathVariable Long userId, @PathVariable Long deckId) {
        deckService.deleteDeck(deckId);
        return ResponseEntity.noContent().build();
    }

   
    
    
    
    
}
