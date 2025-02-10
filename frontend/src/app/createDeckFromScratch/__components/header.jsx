// Contains:
// Create new Deck title
// Button to create the flashcards
// Deck Name
// Deck description

import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Title and button */}
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-4xl font-semibold">Create a new deck</h2>
        <div className="flex flex-row gap-5">
          <Button className="bg-purple-500">Create Deck</Button>
          <Button className="bg-red-500">Cancel</Button>
        </div>
      </div>
      {/* Deck Title Name */}
      <div className="flex flex-col gap-5 w-full">
        <input
          type="text"
          placeholder="Enter the title for the deck"
          className="w-full p-4 border border-gray-100 rounded-md focus:border-b-2 focus:border-b-black focus:outline-none"
        />

        {/* Deck Description */}
        <input
          type="text"
          placeholder="Enter the description for the deck"
          className="w-full p-5 border border-gray-100 rounded-md focus:border-b-2 focus:border-b-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Header;
