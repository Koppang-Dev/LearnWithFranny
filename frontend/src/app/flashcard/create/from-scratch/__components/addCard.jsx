"use client";
import { FaTrash } from "react-icons/fa";

const AddCard = ({ card, deleteCard, updateCardText }) => {
  const handleFrontTextChange = (e) => {
    updateCardText(card.id, e.target.value, card.textBack);
  };

  const handleBackTextChange = (e) => {
    updateCardText(card.id, card.textFront, e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-full border border-gray-100">
      {/* Card number and delete button */}
      <div className="flex flex-row justify-between items-center w-full rounded-md p-5">
        <h1>{card.id}</h1>
        <button
          onClick={() => deleteCard(card.id)}
          className="p-2 bg-transparent border-none"
        >
          <FaTrash className="text-red-500 w-6 h-6" />
        </button>
      </div>
      {/* Front and back of card text */}
      <div className="flex flex-row w-full justify-between p-5">
        {/* Front Card text */}
        <div className="flex flex-col gap-2 items-center w-1/2 m-2">
          <input
            type="text"
            value={card.textFront}
            onChange={handleFrontTextChange}
            placeholder="Enter Term"
            className="w-full pt-5 border-b-2 border-gray-400 rounded-none focus:border-b-2 focus:border-b-black focus:outline-none"
          />
          <h2>Front</h2>
        </div>
        {/* Back Card text */}
        <div className="flex flex-col gap-2 items-center w-1/2 m-2">
          <input
            type="text"
            value={card.textBack}
            onChange={handleBackTextChange}
            placeholder="Enter Term"
            className="w-full pt-5 border-b-2 border-gray-400 rounded-none focus:border-b-2 focus:border-b-black focus:outline-none"
          />
          <h2>Back</h2>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
