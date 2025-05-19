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

  const handleDelete = async () => {
    deleteFolder(10, folder.folderId);
    window.location.reload();
  };

  const handleRename = async () => {
    await renameFolder(10, folder.folderId, newFolderName);
    window.location.reload();
    setIsRenaming(false);
    setShowDropdown(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleFolderClick = (e) => {
    if (isRenaming || isSharing || isDeleting) return;
    onClick(e);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FILE",
    drop: (item) => {
      onFileDrop(item, folder.folderId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop}>
      <div
        onClick={handleFolderClick}
        className={`relative bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer ${
          isOver ? "bg-green-100 border-green-500" : ""
        }`}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {/* More Icon */}
        <div
          className="absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown(e);
          }}
        >
          <FaEllipsisV className="cursor-pointer text-gray-600" />
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

        {/* Folder Name or Rename Input */}
        {isRenaming ? (
          <div className="mt-2">
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                onClick={handleRename}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-300 text-sm rounded-md"
                onClick={() => setIsRenaming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="font-medium text-gray-800">{folder.folderName}</p>
            <p className="text-sm text-gray-500">
              {folder.files?.length || 0} file(s)
            </p>
          </>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
