"use client";
import AddCard from "./__components/addCard";
import BottomSection from "./__components/bottomSection";
import Header from "./__components/header";

import { useState } from "react";

const CreateDeckFromScratch = () => {
  // State to keep track of the amount of cards
  const [cards, setCards] = useState([
    { id: 1, textFront: "", textBack: "" },
    { id: 2, textFront: "", textBack: "" },
    { id: 3, textFront: "", textBack: "" },
    { id: 4, textFront: "", textBack: "" },
    { id: 5, textFront: "", textBack: "" },
  ]);
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
        <Header />

        {/* Render all of the cards */}
        {cards.map((card) => (
          <AddCard
            key={card.id}
            card={card}
            deleteCard={deleteCard}
            updateCardText={updateCardText}
          />
        ))}
        <BottomSection addCard={addCard} />
      </div>
    </div>
  );
};

export default CreateDeckFromScratch;
