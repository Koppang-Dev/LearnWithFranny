import { getUserDecks } from "../utils/DeckServerApi";
import DeckList from "./__components/DeckList";
import Link from "next/link";
export default async function FlashCardPage() {
  // User decks
  const decks = await getUserDecks();

  return (
    <div className="flex flex-col gap-10 m-10 pt-10">
      <div className="flex items-center row gap-10">
        <h1 className="font-semibold text-3xl text-black">
          Your Deck Collection
        </h1>
        {/* Link to create new flashcards */}
        <Link
          href="/flashcard/create"
          className="w-12 h-12 bg-purple-500 text-white rounded-full text-2xl flex items-center justify-center shadow-md hover:bg-purple-700 transition-colors"
        >
          +
        </Link>
      </div>
      <DeckList decks={decks} />
    </div>
  );
}
