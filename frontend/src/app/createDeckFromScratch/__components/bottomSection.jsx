const BottomSection = ({ addCard, createDeck }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Add Card Button */}
      <div className="flex flex-row w-full p-5 bg-white ">
        <div className="flex flex-row w-full justify-center bg-white">
          <button
            onClick={addCard}
            className="pt-5 border-b-2 border-purple-500 text-xl hover:text-purple-200 hover:scale-105 "
          >
            Add Card
          </button>
        </div>
      </div>
      {/* Create Deck Button */}
      <div className="flex flex-row w-full justify-center mt-5">
        {/* Add some margin for spacing */}

        <button
          onClick={createDeck}
          className="w-1/3 p-5 border rounded-xl border-none text-lg font-semibold bg-purple-400 text-white hover:scale-105"
        >
          Create Deck
        </button>
      </div>
    </div>
  );
};

export default BottomSection;
