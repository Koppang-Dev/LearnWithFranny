import DeckCard from "./DeckCard";

export default function DeckList({ decks }) {
  console.log(decks);

  if (!decks || decks.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center p-8 border rounded-lg shadow-md bg-white">
        <img
          src="/assets/readingDoodle.svg"
          alt="No decks"
          className="w-1/2 h-1/2 object-contain mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-600">
          You haven't created any decks yet
        </h2>
        <p className="text-gray-500 mb-4">
          Start creating your first deck now!
        </p>
        <a
          href="/flashcard/create"
          className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transform hover:scale-110 transition-all duration-300"
        >
          Create Your First Deck
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer w-full">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}
