import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FileIcon } from "lucide-react";
import DropDownMenu from "./DropDownMenu";
import { formatDistanceToNow } from "date-fns";

const RecentFileCard = ({ file, onDelete, onRename, onDownload }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState(file.fileName);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileClick = () => {
    if (!isRenaming && !showDropdown) {
      window.open(file.fileUrl, "_blank");
    }
  };

  // Deletig a fule
  const handleDelete = async () => {
    await onDelete(file);
    setIsDeleting(false);
    setShowDropdown(false);
  };

  // Renaming file
  const handleRename = async () => {
    await onRename(file, newFileName);
    setIsRenaming(false);
    setShowDropdown(false);
  };

  // Handling Download
  const handleDownload = async () => {
    await onDownload(file.fileId);
    setShowDropdown(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const formattedTime = file.createdDate
    ? formatDistanceToNow(new Date(file.createdDate), { addSuffix: true })
    : "Unknown time";

  return (
    <div
      onClick={handleFileClick}
      className="relative z-2000 flex flex-col gap-2 items-start p-4 w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition  cursor-pointer"
    >
      {/* Dropdown icon */}
      <div
        className="absolute top-2 right-2 text-gray-400 hover:text-black z-20"
        onClick={toggleDropdown}
      >
        <FaEllipsisV className="cursor-pointer" />
      </div>

      {/* Dropdown menu (absolutely positioned and layered) */}
      {showDropdown && (
        <div className="absolute top-10 right-2 z-50">
          <DropDownMenu
            actions={[
              {
                label: "Rename",
                onClick: async (e) => {
                  e.stopPropagation();
                  setIsRenaming(true);
                  setShowDropdown(false);
                },
              },
              {
                label: "Download",
                onClick: async (e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                  await handleDownload();
                },
              },
              {
                label: "Delete",
                onClick: async (e) => {
                  e.stopPropagation();
                  setIsDeleting(true);
                  setShowDropdown(false);

                  await handleDelete();
                },
              },
            ]}
          />
        </div>
      )}

      {/* File icon and name */}
      <div className="flex items-center gap-3">
        <FileIcon size={32} className="text-purple-500" />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
            {file.fileName}
          </p>
          <span className="text-xs text-gray-500">{file.folderName}</span>
        </div>
      </div>

      {/* Rename input */}
      {isRenaming && (
        <div className="mt-2 flex flex-col gap-2 w-full z-30">
          <input
            type="text"
            className="w-full border rounded-md p-2 text-sm"
            value={newFileName}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                handleRename();
              }}
            >
              Save
            </button>
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-auto">Uploaded {formattedTime}</p>
    </div>
  );
};

export default RecentFileCard;
