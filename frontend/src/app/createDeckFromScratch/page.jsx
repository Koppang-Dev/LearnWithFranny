"use client";
import AddCard from "./__components/addCard";
import BottomSection from "./__components/bottomSection";
import Header from "./__components/header";

import { useState } from "react";

const CreateDeckFromScratch = () => {
  // State to keep track of the amount of cards
  const [cards, setCards] = useState([1, 2, 3]);
  // Adding another card
  const addCard = () => {
    setCards([...cards, cards.length + 1]);
  };

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="flex flex-col gap-10 m-20">
        <Header />

        {/* Render all of the cards */}
        {cards.map((cardNumber) => (
          <AddCard key={cardNumber} cardNumber={cardNumber} />
        ))}
        <BottomSection />
      </div>
    </div>
  );
};

export default CreateDeckFromScratch;
