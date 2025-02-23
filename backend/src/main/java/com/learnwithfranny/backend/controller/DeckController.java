package com.learnwithfranny.backend.controller;
import com.learnwithfranny.backend.dto.CreateDeckDTO;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.service.CardService;
import com.learnwithfranny.backend.service.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;




@Controller
@RequestMapping("api/deck")
public class DeckController {

    @Autowired
    private DeckService deckService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CardService cardService;


    // Create new Deck for a user
    @PostMapping
    public ResponseEntity<String> createDeck(@RequestBody CreateDeckDTO createDeckDTO) {
        // Fetch user from the database using userId
        Optional<User> userOpt = userRepository.findById(createDeckDTO.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(null);  // User not found
        }

        User user = userOpt.get();

        // Map DTO to Deck entity
        Deck deck = new Deck(createDeckDTO.getName(), createDeckDTO.getDescription());
        deck.setUser(user); // Set the fetched user on the deck
        
        // Convert the list of CardDTO to Card entities and associate them with the deck
        List<Card> cards = new ArrayList<>();
        for (CreateDeckDTO.CardDTO cardDTO : createDeckDTO.getCards()) {
            Card card = new Card(cardDTO.getCardNumber(), cardDTO.getFrontText(), cardDTO.getBackText(), deck);
            cards.add(card);
        }
        deck.setCards(cards);

        // Call the service to create the deck
        deckService.createDeck(createDeckDTO.getUserId(), deck);

        return ResponseEntity.status(HttpStatus.CREATED).body("Created Deck!");
    }
    
    // Get all decks for a user
    @GetMapping("/{userId}")
    public ResponseEntity<List<Deck>> getDecks(@PathVariable("userId") Long userId) {
        List<Deck> decks = deckService.getDecksByUser(userId);
        return ResponseEntity.ok(decks);
    }

    // Deleting a deck
    @DeleteMapping("/{deckId}")
    public ResponseEntity<Void> deleteDeck(@PathVariable(name = "userId") Long userId, @PathVariable(name = "deckId") Long deckId) {
        deckService.deleteDeck(deckId);
        return ResponseEntity.noContent().build();
    }
    
    // Retrieve all cards for a deck
    @GetMapping("/cards/{deckId}")
    public ResponseEntity<List<Card>> getCardsFromDeck(@PathVariable(name = "deckId") Long deckId) {
        List<Card> cards = cardService.getCardsByDeck(deckId);
        return ResponseEntity.ok(cards);
    }
    
}
