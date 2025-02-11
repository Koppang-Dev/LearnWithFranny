import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { SketchPicker } from "react-color"; // Import SketchPicker from react-color
import DropdownMenu from "@/app/uploadNote/_components/DropDownMenu";

const DeckList = ({ decks }) => {
  const [showDropdown, setShowDropdown] = useState(null); // Track which deck's dropdown is shown
  const [isRenaming, setIsRenaming] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedColor, setSelectedColor] = useState(""); // Track the selected color
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false); // Toggle color picker visibility
  const [currentDeckId, setCurrentDeckId] = useState(null); // Track which deck's color to change
  const [colorToConfirm, setColorToConfirm] = useState(null); // Store color selected for confirmation

  const toggleDropdown = (deckId) => {
    setShowDropdown(showDropdown === deckId ? null : deckId); // Toggle dropdown visibility for specific deck
  };

  const handleRenameDeck = async (deckId) => {
    console.log(`Renaming deck with ID: ${deckId} to: ${newDeckName}`);
    // Implement renaming logic here
    setIsRenaming(false);
  };

  const handleDeleteDeck = async (deckId) => {
    console.log(`Deleting deck with ID: ${deckId}`);
    // Implement deletion logic here
    setIsDeleting(false);
  };

  // Handle color change
  const handleColorChange = (color) => {
    setSelectedColor(color.hex); // Update the color state
    setColorToConfirm(color.hex); // Save the selected color for confirmation
  };

  // Confirm color change and apply it to the deck
  const handleConfirmColorChange = () => {
    console.log(`Confirmed color change to: ${colorToConfirm}`);
    setSelectedColor(colorToConfirm); // Apply confirmed color
    setIsColorPickerVisible(false); // Close the color picker
  };

  // Toggle color picker visibility
  const toggleColorPicker = (deckId) => {
    setCurrentDeckId(deckId); // Set the current deck ID
    setIsColorPickerVisible(!isColorPickerVisible); // Toggle the color picker visibility
  };

  return (
    <div className="flex flex-col gap-4">
      {decks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg shadow-md bg-white-50 mr-10">
          <h2 className="text-xl font-semibold text-gray-600">
            You haven't created any decks yet
          </h2>
          <button className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            Create Your First Deck
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="border p-20 mb-4 rounded-lg shadow-lg flex items-center justify-center flex-col relative"
              style={{ backgroundColor: selectedColor || "white" }} // Apply the selected color
            >
              <h3 className="text-lg font-semibold text-center">{deck.name}</h3>
              {/* Dropdown button */}
              <div
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(deck.id);
                }}
              >
                <FaEllipsisV className="cursor-pointer" />
              </div>

              {/* Dropdown Menu */}
              {showDropdown === deck.id && (
                <DropdownMenu
                  actions={[
                    {
                      label: "Rename",
                      onClick: () => {
                        setNewDeckName(deck.name); // Pre-fill with the current deck name
                        setIsRenaming(true);
                      },
                    },
                    {
                      label: "Delete",
                      onClick: () => setIsDeleting(true),
                    },
                    {
                      label: "Download",
                      onClick: () => console.log("Download deck"),
                    },
                    {
                      label: "Change Colour",
                      onClick: () => toggleColorPicker(deck.id), // Show the color picker
                    },
                  ]}
                />
              )}

              {/* Rename Logic */}
              {isRenaming && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={newDeckName}
                    onChange={(e) => setNewDeckName(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => handleRenameDeck(deck.id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-md"
                    onClick={() => setIsRenaming(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Confirmation Dialog for Deleting */}
              {isDeleting && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-md shadow-lg">
                    <h3 className="text-lg font-bold">Confirm Delete</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Are you sure you want to delete the deck{" "}
                      <b>{deck.name}</b>?
                    </p>
                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => setIsDeleting(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => handleDeleteDeck(deck.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Color Picker Popup */}
              {isColorPickerVisible && currentDeckId === deck.id && (
                <div className="absolute top-10 right-2 z-50">
                  <SketchPicker
                    color={colorToConfirm || "#ffffff"}
                    onChange={handleColorChange}
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md"
                    onClick={handleConfirmColorChange}
                    disabled={!colorToConfirm} // Disable if no color is selected
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckList;
