"use client";
import { useRouter } from "next/navigation";
import React from "react";

const DeckList = ({ decks }) => {
  const router = useRouter();
  const handleCreateDeckClick = () => {
    router.push("/createDeck"); // Navigate to the CreateDeck page
  };
  return (
    <div className="flex flex-col gap-4">
      {/* User Has not created any decks */}
      {decks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg shadow-md bg-white-50 mr-10">
          <img
            src="/assets/readingDoodle.svg"
            alt="No decks"
            className="w-1/2 h-1/2 object-contain mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-600">
            You haven't created any decks yet
          </h2>
          <p className="text-gray-500 mb-4">
            Start creating your first deck now!
          </p>
          <button
            onClick={handleCreateDeckClick}
            className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transform hover:scale-110 transition-all duration-300"
          >
            Create Your First Deck
          </button>
        </div>
      ) : (
        <div>
          {/* Render the list of decks */}
          {decks.map((deck) => (
            <div key={deck.id} className="border p-4 mb-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{deck.name}</h3>
              {/* Render other deck details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckList;
