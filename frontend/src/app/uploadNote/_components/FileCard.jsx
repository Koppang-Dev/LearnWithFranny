import React, { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";
import {
  deleteFile,
  downloadFile,
  fetchPresignedUrl,
  renameFile,
} from "@/app/utils/FileApi";
import { useDrag } from "react-dnd";
import { useRouter } from "next/navigation";

const FileCard = ({ file, folderId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [newFileName, setNewFileName] = useState(file.fileName);

  const router = useRouter();

  console.log(folderId);
  const handleDelete = async () => {
    console.log(`Deleting file: ${file.fileName}`);
    const folderId = folderId ? folderId : null;
    deleteFile(10, file.fileName, folderId);
    window.location.reload();

    setShowConfirmDialog(false); // Close the dialog after confirming
  };

  // Dragging logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FILE", // Type of draggable item
    item: {
      id: file.fileId,
      fileName: file.fileName,
      folderId: folderId,
    }, // Data passed with the drag
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Handling the renaming of the folder
  const handleRename = async () => {
    console.log(`Renaming folder to: ${newFileName}`);
    setShowDropdown(false);
    await renameFile(10, file.fileId, newFileName);
    setIsRenaming(false);
    window.location.reload();
  };

  // Showing the dropdown
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  // Handle file click to open PDF viewer
  const handleFileClick = async () => {
    // Do not activate when in the drop down
    if (isRenaming || isSharing || isDeleting) {
      return;
    }
    try {
      const preSignedUrl = await fetchPresignedUrl(file.fileId);
      console.log("Pre-signed URL:", preSignedUrl);
      // You can now use this URL to allow the user to download the file
      window.open(preSignedUrl, "_blank");
    } catch (error) {
      console.error("Error fetching pre-signed URL:", error);
    }
  };

  // Handling the file download
  const handleDownload = async () => {
    try {
      console.log("Downloading file...");
      setShowDropdown(false);

      // Assuming `userId` and `fileId` are available in the component
      const response = await downloadFile(file.fileId); // Use your `downloadFile` function here

      // Create a Blob from the binary data
      const blob = new Blob([response], {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      // Use the filename from the response header or a default one
      const filename = "downloaded-file"; // If the filename isn't returned by the response, you can specify a default one

      link.download = filename; // Set the filename for download
      link.click(); // Trigger download
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div
      ref={drag}
      onClick={handleFileClick}
      onMouseLeave={() => setShowDropdown(false)}
      className={`relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all
      ${isDragging ? "opacity-50" : ""}`}
    >
      <Image src="/images/pdf-file.png" alt="" width={50} height={50} />
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
      {/* Drop down menu */}
      {showDropdown && (
        <DropdownMenu
          actions={[
            {
              label: "Rename",
              onClick: (e) => {
                e.stopPropagation();
                setShowDropdown(false);
                setIsRenaming(true);
              },
            },
            {
              label: "Delete",
              onClick: (e) => {
                e.stopPropagation();
                setShowConfirmDialog(true);
                setIsDeleting(true);
              },
            },
            {
              label: "Share",
              onClick: (e) => {
                e.stopPropagation();
                console.log("Share clicked");
              },
            },
            { label: "Download", onClick: () => handleDownload() },
          ]}
        />
      )}

      {/* Rename File */}

      <h2
        className="mt-3 font-medium text-xl"
        onClick={(e) => e.stopPropagation()} // Prevents file click event when clicking on the title
      >
        {file.fileName}
      </h2>
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
