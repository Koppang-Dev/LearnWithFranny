import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FileIcon } from "lucide-react";
import DropDownMenu from "./DropDownMenu";
import { formatDistanceToNow } from "date-fns";

const RecentFileCard = ({ file }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState(file.fileName);

  const handleFileClick = () => {
    window.open(file.fileUrl, "_blank");
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
      className="relative z-10 flex flex-col gap-2 items-start p-4 w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition hover:scale-[1.01] cursor-pointer"
    >
      {/* Dropdown icon */}
      <div
        className="absolute top-2 right-2 text-gray-400 hover:text-black"
        onClick={toggleDropdown}
      >
        <FaEllipsisV className="cursor-pointer" />
      </div>

      {/* File icon + type */}
      <div className="flex items-center gap-3">
        <FileIcon size={32} className="text-purple-500" />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
            {file.fileName}
          </p>
          <span className="text-xs text-gray-500">{file.folderName}</span>
        </div>
      </div>

      {/* Metadata */}
      <p className="text-xs text-gray-400">Uploaded {formattedTime}</p>

      {/* Rename input */}
      {isRenaming && (
        <div className="mt-2 flex flex-col gap-2 w-full">
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
                console.log(`Renamed to: ${newFileName}`);
                setIsRenaming(false);
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

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute top-8 right-2 z-50">
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
                label: "Download",
                onClick: (e) => {
                  e.stopPropagation();
                  window.open(file.fileUrl, "_blank");
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default RecentFileCard;
