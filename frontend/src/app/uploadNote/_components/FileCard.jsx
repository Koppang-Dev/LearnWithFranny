import React, { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";
import { deleteFile, renameFile } from "@/app/utils/FileApi";

const FileCard = ({ file, folder }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState(file.fileName);

  const handleDelete = async () => {
    console.log(`Deleting file: ${file.fileName}`);
    const folderId = folder ? folder.folderId : null;
    deleteFile(10, file.fileName, folderId);
    window.location.reload();

    setShowConfirmDialog(false); // Close the dialog after confirming
  };

  // Handling the renaming of the folder
  const handleRename = async () => {
    console.log(`Renaming folder to: ${newFileName}`);
    setShowDropdown(false);
    await renameFile(10, file.fileId, newFileName);
    setIsRenaming(false);
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
      <Image src="/images/pdf-file.png" alt="" width={50} height={50} />
      <div className="absolute top-2 right-2">
        <FaEllipsisV className="cursor-pointer" onClick={toggleDropdown} />
      </div>
      {showDropdown && (
        <DropdownMenu
          actions={[
            {
              label: "Rename",
              onClick: () => {
                setShowDropdown(false);
                setIsRenaming(true);
              },
            },
            { label: "Delete", onClick: () => setShowConfirmDialog(true) },
            { label: "Share", onClick: () => console.log("Share clicked") },
          ]}
        />
      )}
      <h2 className="mt-3 font-medium text-xl">{file.fileName}</h2>
      {/* Rename File */}
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
              Are you sure you want to delete the file <b>{file.fileName}</b>?
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

export default FileCard;
