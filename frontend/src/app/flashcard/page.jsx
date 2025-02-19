"use client";
import { useEffect, useState } from "react";
import { getUserDecks } from "../utils/DeckApi";
import DeckList from "./__components/decklist";
import Header from "./__components/header";
import RecentlyUsed from "./__components/recentlyUsed";
import { useRouter } from "next/navigation";

const FlashCard = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(null);
  const userId = 10;
  const router = useRouter();

  const handleCreateDeckClick = () => {
    router.push("/createDeck");
  };

  // Fetch decks when the component mounts
  useEffect(() => {
    const fetchDecks = async () => {
      // Retrieving the decks
      try {
        const data = await getUserDecks(userId);
        setDecks(data);
        console.log("Decks", data);
      } catch (error) {
        setError(error);
        console.log("Error fetching decks:", error);
      }
    };
    fetchDecks();
  }, [userId]);

  return (
    <div className="flex flex-col gap-10 pl-10 pt-2clea0">
      <Header onAddNewDeck={handleCreateDeckClick} />
      <DeckList decks={decks} onAddNewDeck={handleCreateDeckClick} />
    </div>
  );
};

export default FlashCard;
