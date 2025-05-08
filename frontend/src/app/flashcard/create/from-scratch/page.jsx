"use client";
import AddCard from "./__components/addCard";
import BottomSection from "./__components/bottomSection";
import Header from "./__components/header";
import { useReducer } from "react";
import { useState } from "react";
import { createUserDeck } from "@/app/utils/DeckApi";
import { useRouter } from "next/navigation";
import toast, { Toast } from "react-hot-toast";

// Inital Card States
const initalState = [
  { id: 1, textFront: "", textBack: "" },
  { id: 2, textFront: "", textBack: "" },
  { id: 3, textFront: "", textBack: "" },
];

function cardReducer(state, action) {
  switch (action.type) {
    case "ADD_CARD":
      return [
        ...state,
        {
          id: state.length + 1,
          textFront: "",
          textBack: "",
        },
      ];
    case "DELETE_CARD":
      return state
        .filter((card) => card.id !== action.payload)
        .map((card, index) => ({ ...card, id: index + 1 }));
    case "UPDATE_CARD":
      return state.map((card) =>
        card.id === action.payload.id
          ? {
              ...card,
              textFront: action.payload.frontText,
              textBack: action.payload.backText,
            }
          : card
      );
    default:
      return state;
  }
}

export default function CreateDeckFromScratch({ deckToEdit = null }) {
  const router = useRouter();
  const [cards, dispatch] = useReducer(
    cardReducer,
    deckToEdit?.cards?.map((card, i) => ({
      id: i + 1,
      textFront: card.frontText,
      textBack: card.backText,
    })) ?? initalState
  );

  const [deckTitle, setDeckTitle] = useState(deckToEdit?.name || "");
  const [deckDescription, setDeckDescription] = useState(
    deckToEdit.description || ""
  );
  const [errorMessage, setErrorMessage] = useState("");

  const createDeck = async () => {
    // Error Checks
    if (!deckTitle.trim()) {
      return setErrorMessage("Deck Title Cannot Be Empty");
    }

    if (cards.length === 0) {
      return setErrorMessage("Must have at least one card");
    }

    const incomplete = cards.find(
      (card) => !card.textFront.trim() || !card.textBack.trim()
    );

    if (incomplete) {
      return setErrorMessage("Each card must have both front and back text");
    }

    setErrorMessage("");

    // Create the deck
    const deck = {
      name: deckTitle,
      description: deckDescription,
      cards: cards.map(({ textFront, textBack }) => ({
        frontText: textFront,
        backText: textBack,
      })),
    };

    try {
      // Editing a prexisting deck
      if (deckToEdit) {
        await updateDeck(deckToEdit.id, deck);
        toast.success("Deck Updated");
        // Creating a new deck
      } else {
        await createUserDeck(deck);
        toast.success("Created Deck");
      }

      // Pushing back to flashcard hub
      router.push("/flashcard");
    } catch (err) {
      toast.error("Error creating deck");
      console.error("Faile creating deck:", err);
      setErrorMessage("Failed to create deck. Please Try Again");
    }
  };

  return (
    <div className="min-h-full">
      <div className="flex flex-col gap-10 m-20">
        <Header
          createDeck={createDeck}
          deckTitle={deckTitle}
          deckDescription={deckDescription}
          setDeckTitle={setDeckTitle}
          setDeckDescription={setDeckDescription}
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {cards.map((card) => (
          <AddCard
            key={card.id}
            card={card}
            deleteCard={(id) => dispatch({ type: "DELETE_CARD", payload: id })}
            updateCardText={(id, frontText, backText) =>
              dispatch({
                type: "UPDATE_CARD",
                payload: { id, frontText, backText },
              })
            }
          />
        ))}

        <BottomSection
          addCard={() => dispatch({ type: "ADD_CARD" })}
          createDeck={createDeck}
        />
      </div>
    </div>
  );
}
