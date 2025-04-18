import { deleteFolder, renameFolder } from "@/app/utils/FileApi";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";
import { useDrop } from "react-dnd";

const FolderCard = ({ folder, onFileDrop, onClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.folderName);

  // Handling the deletion of the document
  const handleDelete = async () => {
    // Add delete folder logic here
    console.log(`Deleting folder: ${folder.folderName}`);
    deleteFolder(10, folder.folderId);
    window.location.reload();
  };

  // Handling the renaming of the folder
  const handleRename = async () => {
    console.log(`Renaming folder to: ${newFolderName}`);
    setShowDropdown(false);
    await renameFolder(10, folder.folderId, newFolderName);
    window.location.reload();
    setIsRenaming(false);
  };

  // Showing the dropdown
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  // Handle file click to open PDF viewer
  const handleFolderClick = async (e) => {
    // Do not activate when in the drop down
    if (isRenaming || isSharing || isDeleting) {
      return;
    }
    onClick(e);
  };

  // Drag and drop logic for the folder
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FILE", // The folder accepts files as the drop target
    drop: (item) => {
      console.log(
        `Dropped file: ${item.fileName} (original folder ID: ${item.folderId}) into folder: ${item.folderName}`
      );
      // Call the onFileDrop callback when a file is dropped into the folder
      onFileDrop(item, folder.folderId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Is the folder currently being hovered over by a draggable item?
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all
      ${isOver ? "bg-green-100 border-green-500" : "bg-white"}`}
      onMouseLeave={() => setShowDropdown(false)}
      onClick={handleFolderClick}
    >
      {/* More button - Triggers dropdown */}
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
                setShowDropdown(false);
              },
            },
            {
              label: "Delete",
              onClick: (e) => {
                e.stopPropagation();
                setIsDeleting(true);
                setShowConfirmDialog(true);
              },
            },
            { label: "Share", onClick: () => console.log("Share clicked") },
          ]}
        />
      )}
      <h2 className="mt-3 font-medium text-xl">{folder.folderName}</h2>
      {/* Rename Folder */}
      {isRenaming && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="border rounded-md p-2"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleRename}
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
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete the folder{" "}
              <b>{folder.folderName}</b>?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderCard;
