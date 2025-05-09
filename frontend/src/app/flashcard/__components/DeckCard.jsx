"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisV } from "react-icons/fa";
import { SketchPicker } from "react-color";
import DropdownMenu from "@/app/uploadNote/_components/DropDownMenu"; // adjust if needed

export default function DeckCard({ deck, onDelete }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(deck.name);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const handleRename = () => {
    console.log("Renaming to:", newName);
    setIsRenaming(false);
  };

  const handleEdit = () => {
    router.push(`/flashcard/edit/${deck.id}`);
  };

  const handleDelete = async () => {
    if (onDelete) {
      console.log("Deleting:", deck.id);
      await onDelete();
    }
  };

  return (
    <div
      className="relative border p-6 rounded-lg shadow-md flex flex-col justify-between bg-white hover:shadow-lg transition"
      style={{ backgroundColor: color }}
      onClick={() => router.push(`/flashcard/study/${deck.id}`)}
    >
      <h3 className="text-lg font-bold mb-2">{deck.name}</h3>
      <p className="text-sm text-gray-600">{deck.description}</p>
      <span className="text-sm text-gray-500 mt-1">
        {deck.cardCount} card{deck.cardCount !== 1 && "s"}
      </span>

      {/* Dropdown trigger */}
      <div
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown((prev) => !prev);
        }}
      >
        <FaEllipsisV className="cursor-pointer" />
      </div>

      {showDropdown && (
        <DropdownMenu
          actions={[
            {
              label: "Edit",
              onClick: (e) => {
                e.stopPropagation();
                handleEdit();
                setShowDropdown(false);
              },
            },
            {
              label: "Delete",
              onClick: (e) => {
                e.stopPropagation();
                handleDelete();
                setShowDropdown(false);
              },
            },
          ]}
        />
      )}

      {/* Rename UI */}
      {isRenaming && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 left-2 right-2 bg-white p-4 rounded-md shadow-md z-50"
        >
          <input
            className="border p-2 w-full rounded mb-2"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-1 text-sm bg-gray-200 rounded"
              onClick={() => setIsRenaming(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 text-sm bg-blue-600 text-white rounded"
              onClick={handleRename}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Color Picker UI */}
      {showColorPicker && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 right-2 z-50"
        >
          <SketchPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}
