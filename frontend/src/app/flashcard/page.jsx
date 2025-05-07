import { getUserDecks } from "../utils/DeckServerApi";
import DeckList from "./__components/DeckList";

export default async function FlashCardPage() {
  // User decks
  const decks = await getUserDecks();

  return (
    <div className="flex flex-col gap-10 m-10 pt-10">
      <DeckList decks={decks} />
    </div>
  );
}
