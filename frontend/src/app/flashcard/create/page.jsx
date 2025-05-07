"use client";

import DeckOptionButton from "./_buttons/DeckOptionButton";
import { FaPlus, FaFileAlt, FaUpload } from "react-icons/fa";

export default function CreateDeck() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-4">
      <h1 className="text-4xl sm:text-5xl font-semibold mb-8 text-center">
        Create a New Deck
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-xl">
        <DeckOptionButton
          label="Create From Scratch"
          path="/flashcard/create/from-scratch"
          color="bg-purple-400"
          icon={<FaPlus />}
        />
        <DeckOptionButton
          label="Transform From Documents"
          path="/flashcard/create/transform"
          color="bg-sky-400"
          icon={<FaFileAlt />}
        />
        <DeckOptionButton
          label="Upload Document"
          path="/flashcard/create/upload"
          color="bg-amber-400"
          icon={<FaUpload />}
        />
      </div>
    </div>
  );
}
