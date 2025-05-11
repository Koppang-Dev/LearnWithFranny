"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = ({
  deckTitle,
  deckDescription,
  createDeck,
  setDeckTitle,
  setDeckDescription,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10">
      {/* Title and button */}
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-4xl font-semibold">Create a new deck</h2>
        <div className="flex flex-row gap-5">
          <Button onClick={createDeck} className="bg-purple-500">
            Create Deck
          </Button>
          <Button className="bg-red-500" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
      {/* Deck Title Name */}
      <div className="flex flex-col gap-5 w-full">
        <input
          type="text"
          placeholder="Enter the title for the deck"
          value={deckTitle}
          onChange={(e) => setDeckTitle(e.target.value)}
          className="w-full p-4 border border-gray-100 rounded-md focus:border-b-2 focus:border-b-black focus:outline-none"
        />

        {/* Deck Description */}
        <textarea
          placeholder="Enter the description for the deck"
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
          className="w-full h-32 p-4 border border-gray-100 rounded-md focus:border-b-2 focus:border-b-black focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default Header;
