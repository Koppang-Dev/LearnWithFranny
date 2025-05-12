"use client";

import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

const Flashcard = ({ cardId, frontText, backText, onDifficultyChange }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDifficultyChange = (difficulty) => {
    onDifficultyChange(difficulty, cardId);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [frontText, backText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        {/* Front */}
        <div
          onClick={flipCard}
          className="bg-gray-100 w-[700px] h-[500px] flex items-center justify-center p-4"
        >
          <div className="text-center text-2xl font-semibold max-h-full overflow-auto">
            {frontText}
          </div>
        </div>

        {/* Back */}
        <div
          onClick={flipCard}
          className="bg-gray-100 w-[700px] h-[500px] flex items-center justify-center p-4"
        >
          <div className="text-center text-2xl max-h-full overflow-auto">
            {backText}
          </div>
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
