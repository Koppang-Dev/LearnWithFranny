"use client";

import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

// Flashcard component
const Flashcard = ({ frontText, backText, onDifficultyChange }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDifficultyChange = (difficulty) => {
    // Send the difficulty choice to the parent to move to the next card
    onDifficultyChange(difficulty);
  };

  // Flipping the card
  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  // Ensuring the front of the card shows first
  useEffect(() => {
    setIsFlipped(false);
  }, [frontText, backText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Adding the Front + Back of card */}

      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        {/* Front of card */}
        <div
          onClick={flipCard}
          className="flex items-center bg-gray-100 w-[700px] h-[500px] justify-center"
        >
          <h1 className="text-2xl font-semibold">{frontText}</h1>
        </div>
        {/* Back of card  */}
        <div
          onClick={flipCard}
          className="flex items-center bg-gray-100 w-[700px] h-[500px] justify-center"
        >
          <h1 className="text-2xl">{backText}</h1>
        </div>
      </ReactCardFlip>
      {/* Difficulty Buttons */}
      <div className="flex gap-6 mt-8">
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-md text-xl"
          onClick={() => handleDifficultyChange("easy")}
        >
          Easy
        </button>
        <button
          className="px-6 py-3 bg-yellow-500 text-white rounded-md text-xl"
          onClick={() => handleDifficultyChange("medium")}
        >
          Medium
        </button>
        <button
          className="px-6 py-3 bg-red-500 text-white rounded-md text-xl"
          onClick={() => handleDifficultyChange("hard")}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
