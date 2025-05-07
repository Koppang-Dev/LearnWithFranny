export default function CreateButton() {
  return (
    <button
      onClick={onAddNewDeck}
      className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transform hover:scale-110 transition-all duration-300"
    >
      Create Your First Deck
    </button>
  );
}
