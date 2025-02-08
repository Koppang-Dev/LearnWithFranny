"use client";
import { FileIcon, FolderIcon, MicIcon } from "lucide-react"; // Icons
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
    <div className="flex items-center justify-between w-full pt-0 pl-20 pr-20">
      {/* Going through the item list */}
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center shadow-lg border border-gray-50 rounded-lg gap-6 hover:shadow-xl hover:bg-gray-50 cursor-pointer transition-all w-96 h-40"
        >
          {React.createElement(item.icon, { size: 40 })}
          <p className="text-black font-semibold text-sm mt-2">{item.name}</p>
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
