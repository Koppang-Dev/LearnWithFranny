"use client";
import { FileIcon, FolderIcon, MicIcon, PlusIcon } from "lucide-react"; // Icons
import React from "react";
import UploadScreen from "./UploadScreen";
import { useState } from "react";

// List for the 4 options with their names logos and actions
const items = [
  {
    name: "Upload Document",
    icon: FileIcon,
    action: (setDialogOpen) => setDialogOpen(true),
  },
  {
    name: "Create Folder",
    icon: FolderIcon,
    action: () => console.log("Create Folder Clicked"),
  },
  {
    name: "Voice Recording",
    icon: MicIcon,
    action: () => console.log("Voice Recording Clicked"),
  },
  {
    name: "Upload Media",
    icon: FileIcon,
    action: () => console.log("Upload Media Clicked"),
  },
];
const FileHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="flex items-center justify-between w-full pt-0 pr-20">
      {/* Going through the item list */}
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center justify-center shadow-lg border border-gray-100 rounded-lg gap-1 hover:shadow-xl cursor-pointer hover:bg-gray-50 transition-all w-96 h-28"
        >
          {/* Plus Icon Top Right */}
          <PlusIcon
            size={20}
            className="absolute top-2 right-2 text-black cursor-pointer z-10"
          />
          {React.createElement(item.icon, {
            size: 40,
            style: { color: "black" },
          })}
          <p className="text-black font-semibold text-lg mt-2">{item.name}</p>
        </div>
      ))}

      {/* Render the Upload Screen */}
      {dialogOpen && (
        <UploadScreen children={<Button>Open Upload Dialog</Button>} />
      )}
    </div>
  );
};

export default FileHeader;
