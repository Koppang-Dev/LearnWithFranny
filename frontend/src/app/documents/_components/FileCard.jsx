import React, { useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";
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

  const handleDelete = async () => {
    const folderId = folderId ? folderId : null;
    deleteFile(10, file.fileName, folderId);
    window.location.reload();
    setShowConfirmDialog(false);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FILE",
    item: {
      id: file.fileId,
      fileName: file.fileName,
      folderId: folderId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleRename = async () => {
    setShowDropdown(false);
    await renameFile(10, file.fileId, newFileName);
    setIsRenaming(false);
    window.location.reload();
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleFileClick = async () => {
    if (isRenaming || isSharing || isDeleting) return;
    try {
      const preSignedUrl = await fetchPresignedUrl(file.fileId);
      window.open(preSignedUrl, "_blank");
    } catch (error) {
      console.error("Error fetching pre-signed URL:", error);
    }
  };

  const handleDownload = async () => {
    try {
      setShowDropdown(false);
      const response = await downloadFile(file.fileId);
      const blob = new Blob([response], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "downloaded-file";
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div
      ref={drag}
      onClick={handleFileClick}
      onMouseLeave={() => setShowDropdown(false)}
      className={`relative flex flex-col p-5 shadow-md rounded-md border bg-white transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* Header with icon and menu */}
      <div className="w-full flex justify-between items-start">
        <Image src="/images/pdf-file.png" alt="" width={50} height={50} />

        <div className="flex flex-col items-end">
          <div onClick={toggleDropdown} className="cursor-pointer">
            <FaEllipsisV />
          </div>

          {showDropdown && (
            <div className="mt-2">
              <DropDownMenu
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
                  { label: "Download", onClick: handleDownload },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {/* File name */}
      <h2
        className="mt-4 font-medium text-xl text-center break-words"
        onClick={(e) => e.stopPropagation()}
      >
        {file.fileName}
      </h2>

      {/* Rename input */}
      {isRenaming && (
        <div className="mt-4 flex gap-2 w-full">
          <input
            type="text"
            className="border rounded-md p-2 flex-1"
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

      {/* Confirmation dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete <b>{file.fileName}</b>?
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
