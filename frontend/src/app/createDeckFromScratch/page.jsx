"use client";
import AddCard from "./__components/addCard";
import BottomSection from "./__components/bottomSection";
import Header from "./__components/header";

import { useState } from "react";
import { createUserDeck } from "../utils/DeckApi";
import { useRouter } from "next/navigation";

const CreateDeckFromScratch = () => {
  // State to keep track of the amount of cards
  const [cards, setCards] = useState([
    { id: 1, textFront: "", textBack: "" },
    { id: 2, textFront: "", textBack: "" },
    { id: 3, textFront: "", textBack: "" },
    { id: 4, textFront: "", textBack: "" },
    { id: 5, textFront: "", textBack: "" },
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const userId = 10;
  const router = useRouter();

  const createDeck = () => {
    console.log("Creating Deck");
    // Check to make sure the title is not null
    if (!deckTitle || deckTitle.trim() === "") {
      setErrorMessage("Deck Title cannot be empty");
      return;
    }

    // Making sure each front and back card has text
    const incompleteCard = cards.find(
      (card) => !card.textFront.trim() || !card.textBack.trim()
    );

    if (incompleteCard) {
      setErrorMessage("Each card must have both a front and back text ");
      return;
    }

    // Clearing error message
    setErrorMessage("");

    // Create the deck object
    const deck = {
      userId: userId,
      name: deckTitle,
      description: deckDescription,
      cards: cards.map((card) => ({
        frontText: card.textFront,
        backText: card.textBack,
      })),
    };

    console.log(deck);

    // Call the API to create the deck
    createUserDeck(deck)
      .then((createdDeck) => {
        console.log("Deck created successfully:", createdDeck);
        router.push("/flashcard");
      })
      .catch((error) => {
        console.error("Error creating deck:", error);
        setErrorMessage("Failed to create deck. Please try again.");
      });
  };

  // Adding another card
  const addCard = () => {
    const newCardId = cards.length + 1;
    setCards([...cards, { id: newCardId, textFront: "", textBack: "" }]);
  };

  // Function to delete a card and renumber remaining cards
  const deleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    // Re-index the remaining cards
    const reIndexedCards = updatedCards.map((card, index) => ({
      ...card,
      id: index + 1,
    }));
    setCards(reIndexedCards);
  };

  // Update card text
  const updateCardText = (id, frontText, backText) => {
    const updatedCards = cards.map((card) =>
      card.id === id
        ? { ...card, textFront: frontText, textBack: backText }
        : card
    );
    setCards(updatedCards); // Update the state with the new card text
  };

  return (
    <div className="min-h-full">
      <div className="flex flex-col gap-10 m-20">
        <Header
          createDeck={createDeck}
          deckTitle={deckTitle}
          deckDescription={deckDescription}
          setDeckDescription={setDeckDescription}
          setDeckTitle={setDeckTitle}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Render all of the cards */}
        {cards.map((card) => (
          <AddCard
            key={card.id}
            card={card}
            deleteCard={deleteCard}
            updateCardText={updateCardText}
          />
        ))}
        <BottomSection addCard={addCard} createDeck={createDeck} />
      </div>
    </div>
  );
};

export default CreateDeckFromScratch;
