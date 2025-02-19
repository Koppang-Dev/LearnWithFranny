const Header = ({ onAddNewDeck }) => {
  return (
    <div className="flex gap-10 items-center">
      {/* Title */}
      <h2 className="font-bold text-4xl "> Your Deck Collection</h2>

      {/* Button to create new flashcards */}
      <button
        onClick={onAddNewDeck}
        className="px-4 py-4 bg-purple-500 text-white rounded-full text-2xl flex items-center justify-center shadow-md hover:bg-purple-700 transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default Header;
