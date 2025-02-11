"use client";
import { useEffect, useState } from "react";
import { getUserDecks } from "../utils/DeckApi";
import DeckList from "./__components/decklist";
import Header from "./__components/header";
import RecentlyUsed from "./__components/recentlyUsed";

const FlashCard = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(null);
  const userId = 10;

  // Fetch decks when the component mounts
  useEffect(() => {
    const fetchDecks = async () => {
      // Retrieving the decks
      try {
        const data = await getUserDecks(userId);
        setDecks(data);
      } catch (error) {
        setError(error);
        console.log("Error fetching decks:", error);
      }
    };
    fetchDecks();
  }, [userId]);

  return (
    <div className="flex flex-col gap-10 pl-10 pt-20">
      <Header />
      <DeckList decks={decks} />
    </div>
  );
};

export default FlashCard;
