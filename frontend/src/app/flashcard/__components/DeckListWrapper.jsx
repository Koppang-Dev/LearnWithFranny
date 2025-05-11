import { getUserDecks } from "@/app/utils/DeckServerApi";
import DeckList from "./DeckList";

export default async function DecKlistWrapper() {
  const decks = await getUserDecks();
  return <DeckList decks={decks} />;
}
