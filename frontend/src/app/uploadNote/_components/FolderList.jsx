import React from "react";
import FolderCard from "./FolderCard";

const FolderList = ({ folders, onFileDrop, onFolderClick }) => (
  <div className="mt-10">
    <h3 className="font-bold text-2xl mb-4">Folders</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {folders.map((folder) => (
        <FolderCard
          key={folder.folderId}
          folder={folder}
          onFileDrop={onFileDrop}
          onClick={() => onFolderClick(folder)}
        />
      ))}
    </div>
  </div>
);

export default FolderList;
