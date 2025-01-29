import { deleteFolder } from "@/app/utils/FileApi";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";

const FolderCard = ({ folder }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Handling the deletion of the document
  const handleDelete = async () => {
    // Add delete folder logic here
    console.log(`Deleting folder: ${folder.folderName}`);
    deleteFolder(10, folder.folderId);
    window.location.reload();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div
      className="relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="absolute top-2 right-2">
        <FaEllipsisV className="cursor-pointer" onClick={toggleDropdown} />
      </div>
      {showDropdown && (
        <DropdownMenu
          actions={[
            { label: "Rename", onClick: () => console.log("Rename clicked") },
            { label: "Delete", onClick: handleDelete },
            { label: "Share", onClick: () => console.log("Share clicked") },
          ]}
        />
      )}
      <h2 className="mt-3 font-medium text-xl">{folder.folderName}</h2>
    </div>
  );
};

export default FolderCard;
