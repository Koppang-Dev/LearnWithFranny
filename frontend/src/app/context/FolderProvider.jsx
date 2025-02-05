"use client";
import { createContext, useContext, useState } from "react";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [currentFolder, setCurrentFolder] = useState({ folderId: null });

  return (
    <FolderContext.Provider value={{ currentFolder, setCurrentFolder }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => useContext(FolderContext);
