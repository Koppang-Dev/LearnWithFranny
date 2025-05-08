"use client";

import DeckCard from "./DeckCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteDeck } from "@/app/utils/DeckApi";
export default function DeckList({ decks }) {
  const [deckList, setDeckList] = useState(decks);
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteDeck(id);
      setDeckList((prev) => prev.filter((deck) => deck.id !== id));
      toast.success("Deleted Deck");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting deck");
    }
  };

  return deckList && deckList.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer w-full">
      {deckList.map((deck) => (
        <DeckCard
          key={deck.id}
          deck={deck}
          onDelete={() => handleDelete(deck.id)}
        />
      ))}
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center text-center p-8 border rounded-lg shadow-md bg-white">
      <img
        src="/assets/readingDoodle.svg"
        alt="No decks"
        className="w-1/2 h-1/2 object-contain mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-600">
        You haven't created any decks yet
      </h2>
      <p className="text-gray-500 mb-4">Start creating your first deck now!</p>
      <a
        href="/flashcard/create"
        className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transform hover:scale-110 transition-all duration-300"
      >
        Create Your First Deck
      </a>
    </div>
  );
}
