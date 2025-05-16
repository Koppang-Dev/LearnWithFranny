"use client";

import React, { useState } from "react";
import { FileIcon, FolderIcon, MicIcon, PlusIcon } from "lucide-react";
import CreateFolderScreen from "./CreateFolderScreen";
import UploadScreen from "./UploadScreen";

const FileHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);

  const items = [
    {
      name: "Upload Document",
      icon: FileIcon,
      action: () => setDialogOpen(true),
    },
    {
      name: "Create Folder",
      icon: FolderIcon,
      action: () => setCreateFolderDialogOpen(true),
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

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto place-items-stretch">
        {items.map((item, index) => (
          <ActionCard
            key={index}
            icon={item.icon}
            label={item.name}
            onClick={item.action}
          />
        ))}
      </div>

      {/* Modals */}
      <UploadScreen dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <CreateFolderScreen
        dialogOpen={createFolderDialogOpen}
        setCreateFolderDialogOpen={setCreateFolderDialogOpen}
      />
    </>
  );
};

const ActionCard = ({ icon: Icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center h-full min-h-[140px] rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition cursor-pointer group"
    >
      <PlusIcon
        className="absolute top-2 right-2 text-gray-400 group-hover:text-black"
        size={18}
      />
      <Icon size={36} className="text-purple-600 mb-2" />
      <p className="text-sm font-semibold text-gray-800 text-center">{label}</p>
    </div>
  );
};

export default FileHeader;
