import { getDeckById } from "@/app/utils/DeckApi";
import CreateDeckFromScratch from "../../create/from-scratch/CreateDeckForm";
export default async function EditDeckPage({ params }) {
  const deck = await getDeckById(params.id);

  return <CreateDeckFromScratch deckToEdit={deck} />;
}
