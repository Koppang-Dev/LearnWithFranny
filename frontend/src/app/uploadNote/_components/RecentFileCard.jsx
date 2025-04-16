import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FileIcon } from "lucide-react";
import DropDownMenu from "./DropDownMenu";

const RecentFileCard = ({ file }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState(file.fileName);

  // Handle file click (e.g., open file in viewer or download)
  const handleFileClick = async () => {
    try {
      // You can add logic to open or download the file
      console.log(`Opening file: ${file.fileName}`);
    } catch (error) {
      console.error("Error handling file click:", error);
    }
  };

  // Handle dropdown menu visibility
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  return (
    <div
      onClick={handleFileClick}
      className="relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
    >
      {/* File icon and title beside each other */}
      <div className="flex items-center space-x-2">
        <FileIcon size={40} />
        <h2
          className="mt-3 font-medium text-xl"
          onClick={(e) => e.stopPropagation()} // Prevents file click event when clicking on the title
        >
          {file.folderName}
        </h2>
      </div>

      <div
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown(e);
        }}
      >
        <FaEllipsisV className="cursor-pointer" />
      </div>

      {showDropdown && (
        <DropDownMenu
          actions={[
            {
              label: "Rename",
              onClick: (e) => {
                e.stopPropagation();
                setIsRenaming(true);
              },
            },
            {
              label: "Download",
              onClick: () => console.log("Download clicked"),
            },
            // Add other actions if needed
          ]}
        />
      )}

      {/* Add more UI elements for the file like the "Last Modified" timestamp */}
      <p className="text-sm text-gray-600">{file.lastModified}</p>

      {isRenaming && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="border rounded-md p-2"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => console.log(`Renamed to: ${newFileName}`)}
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
    </div>
  );
};

export default RecentFileCard;
