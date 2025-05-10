"use client";

import { getDeckCards } from "@/app/utils/DeckApi";
import { handleFlashcardDifficulty } from "@/app/utils/ReviewApi";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Flashcard from "../__components/Flashcard";
const FlashCardStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficultyResults, setDifficultyResults] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { deckId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);

  // Ensure this only runs on the client side
  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client
  }, []);

  // User determines difficulty for flashcard
  const handleDifficultyChange = (difficulty, cardId) => {
    // Notify backend about the difficulty
    handleFlashcardDifficulty(difficulty, cardId);

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // If it's the last card, reset to the first
      setCurrentIndex(0);
    }
  };

  const currentCard = flashcards[currentIndex];

  // Fetch cards when deckId changes
  useEffect(() => {
    if (deckId) {
      const fetchCards = async () => {
        try {
          const data = await getDeckCards(deckId);
          setFlashcards(data);
        } catch (error) {
          setError(error);
          console.log("Error fetching decks:", error);
        }
      };
      fetchCards();
    }
  }, [deckId]);

  if (error) {
    return <div>Error loading deck: {error.message}</div>;
  }

  if (!flashcards) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flashcards for Deck {deckId}</h1>
      {currentCard && (
        <Flashcard
          cardId={currentCard.id}
          frontText={currentCard.frontText}
          backText={currentCard.backText}
          onDifficultyChange={handleDifficultyChange}
        />
      )}
    </div>
  );
};

export default FlashCardStudy;
