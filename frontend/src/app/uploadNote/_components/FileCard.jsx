import React, { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";

const FileCard = ({ file }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = async () => {
    console.log(`Deleting file: ${file.fileName}`);
    setShowConfirmDialog(false); // Close the dialog after confirming
  };

  return (
    <div
      className="relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <Image src="/images/pdf-file.png" alt="" width={50} height={50} />
      <div className="absolute top-2 right-2">
        <FaEllipsisV
          className="cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        />
      </div>
      {showDropdown && (
        <DropdownMenu
          actions={[
            { label: "Rename", onClick: () => console.log("Rename clicked") },
            { label: "Delete", onClick: () => setShowConfirmDialog(true) },
            { label: "Share", onClick: () => console.log("Share clicked") },
          ]}
        />
      )}
      <h2 className="mt-3 font-medium text-xl">{file.fileName}</h2>

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
