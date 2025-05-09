package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.dto.CreateDeckDTO;
import com.learnwithfranny.backend.dto.DeckResponseDTO;
import com.learnwithfranny.backend.exceptions.UserNotFoundException;
import com.learnwithfranny.backend.model.Card;
import com.learnwithfranny.backend.model.Deck;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.DeckRepository;
import com.learnwithfranny.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.learnwithfranny.backend.service.UserService;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class DeckService {

    @Autowired
    private DeckRepository deckRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    public Deck createDeckForUser(CreateDeckDTO dto) {
        User user = userService.getCurrentUser();
        Deck deck = new Deck(dto.getName(), dto.getDescription());
        deck.setUser(user);

        // Creating card entity for each card
        List<Card> cards = dto.getCards().stream().map(cardDTO ->
            new Card(cardDTO.getCardNumber(), cardDTO.getFrontText(), cardDTO.getBackText(), deck)
                ).collect(Collectors.toList());
                deck.setCards(cards);
            
            return deckRepository.save(deck);
        }

    // Getting all of a user's decks
    public List<DeckResponseDTO> getDecksByUser() {
        User user = userService.getCurrentUser();
        List<Deck> decks = deckRepository.findAllByUserId(user.getId());
        return decks.stream().map(this::toDeckDTO).toList();
    }

    // Converting list of decks to deck response dto
    private DeckResponseDTO toDeckDTO(Deck deck) {
        return new DeckResponseDTO(
            deck.getId(),
            deck.getName(),
            deck.getDescription(),
            deck.getCards() != null ? deck.getCards().size() : 0
            );
    }

    // Retrieving specific deck
    public Deck getDeckById(Long deckId) {
        return deckRepository.findById(deckId).orElseThrow(() -> new RuntimeException("Deck not found with id: " + deckId));
    }

    // Deleting a deck
    @Transactional
    public void deleteDeck(Long deckId) {
        User user = userService.getCurrentUser();
        deckRepository.deleteByIdAndUser(deckId, user);
    }

    // Adding a card to a deck
    public Deck addCardToDeck(Long deckId, Card card) {

        // Find the deck
        Optional<Deck> deck = deckRepository.findById(deckId);
        if (deck.isPresent()) {
            deck.get().getCards().add(card);
            return deckRepository.save(deck.get());
        }
        return null;
    }

    // Updating a deck
    @Transactional
    public Deck updateDeck(Long deckId, CreateDeckDTO dto) {
        User user = userService.getCurrentUser();
        Deck deck = deckRepository.findById(deckId)
            .orElseThrow(() -> new RuntimeException("Deck not found with id: " + deckId));

        if (!deck.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        deck.setName(dto.getName());
        deck.setDescription(dto.getDescription());

        // Modifying cards in place
        deck.getCards().clear();
        deck.getCards().addAll(
            dto.getCards().stream()
                .map(cardDTO -> new Card(
                    cardDTO.getCardNumber(),
                    cardDTO.getFrontText(),
                    cardDTO.getBackText(),
                    deck
                ))
                .collect(Collectors.toList())
        );

        return deckRepository.save(deck);
    }
}
