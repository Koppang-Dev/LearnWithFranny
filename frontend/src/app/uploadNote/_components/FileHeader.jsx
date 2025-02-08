"use client";
import { FileIcon, FolderIcon, MicIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import CreateFolderScreen from "./CreateFolderScreen";
import UploadScreen from "./UploadScreen";

const items = [
  {
    name: "Upload Document",
    icon: FileIcon,
    action: (setDialogOpen) => setDialogOpen(true),
  },
  {
    name: "Create Folder",
    icon: FolderIcon,
    action: (setCreateFolderDialogOpen) => setCreateFolderDialogOpen(true),
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
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false); // State for Create Folder dialog

  return (
    <div className="flex items-center justify-between w-full pt-0 pr-20">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center justify-center shadow-lg border border-gray-100 rounded-lg gap-1 hover:shadow-xl cursor-pointer hover:bg-gray-50 transition-all w-96 h-28"
          onClick={() =>
            item.action(
              item.name === "Upload Document"
                ? setDialogOpen
                : setCreateFolderDialogOpen
            )
          } // Pass the correct setter
        >
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

      {/* Show UploadScreen when dialogOpen is true */}
      <UploadScreen dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />

      <CreateFolderScreen
        dialogOpen={createFolderDialogOpen}
        setCreateFolderDialogOpen={setCreateFolderDialogOpen}
      />
    </div>
  );
};

export default FileHeader;
