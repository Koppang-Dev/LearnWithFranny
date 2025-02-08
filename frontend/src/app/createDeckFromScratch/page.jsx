"use client";
import { useState } from "react";

const CreateDeckFromScratch = () => {
  // States for managing the deck name and flashcards
  const [deckName, setDeckName] = useState("");
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);

  // Add new flashcard
  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, { question: "", answer: "" }]);
  };

  // Handle input changes for flashcards
  const handleFlashcardChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  // Handle deck name change
  const handleDeckNameChange = (e) => {
    setDeckName(e.target.value);
  };

  // Handle form submission (e.g., creating the deck)
  const handleCreateDeck = (e) => {
    e.preventDefault();
    // Handle the creation of the deck logic here
    console.log("Deck Created:", { deckName, flashcards });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Create a Deck</h1>

      {/* Form for Deck Creation */}
      <form
        onSubmit={handleCreateDeck}
        className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Deck Name Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Deck Name
          </label>
          <input
            type="text"
            value={deckName}
            onChange={handleDeckNameChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the deck name"
            required
          />
        </div>

        {/* Flashcards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Flashcards
          </h2>
          {flashcards.map((flashcard, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm mb-4"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Question #{index + 1}
                </label>
                <input
                  type="text"
                  value={flashcard.question}
                  onChange={(e) =>
                    handleFlashcardChange(index, "question", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the question"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Answer #{index + 1}
                </label>
                <input
                  type="text"
                  value={flashcard.answer}
                  onChange={(e) =>
                    handleFlashcardChange(index, "answer", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the answer"
                  required
                />
              </div>
            </div>
          ))}

          {/* Add Flashcard Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddFlashcard}
              className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
            >
              + Add Flashcard
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Create Deck
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeckFromScratch;
