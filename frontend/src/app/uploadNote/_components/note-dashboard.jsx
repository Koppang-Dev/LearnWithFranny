import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import SearchBar from "@/components/custom/SearchBar";
import FileList from "./FileList";
import FolderList from "./FolderList";
import { fetchDocuments, moveFileToFolder } from "@/app/utils/FileApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const NoteDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null); // Track selected folder
  const [defaultFolderFiles, setDefaultFolderFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const userId = user?.id ?? 10;

  // Handle drag-and-drop functionality
  const handleDrop = async (item, targetFolderId) => {
    console.log("Dropped File ID:", item.id);
    console.log("Dropped file:", item.fileName);
    console.log("Original folder:", item.folderId);
    console.log("Target folder:", targetFolderId);

    try {
      await moveFileToFolder(userId, item.id, item.folderId, targetFolderId);
      window.location.reload(); // Force refresh the screen
    } catch (error) {
      console.error("Error moving file:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDocuments(userId);
        const defaultFolder = data.find(
          (folder) => folder.folderName === "Default Folder"
        );
        setDefaultFolderFiles(defaultFolder?.files || []);
        setDocuments(
          data.filter((folder) => folder.folderName !== "Default Folder")
        );
        setLoading(false);
      } catch {
        setError("Failed to load documents");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>Loading documents...</div>;
  if (error) return <div>{error}</div>;

  const filteredDefaultFiles = defaultFolderFiles.filter((file) =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFolders = documents.filter((folder) =>
    folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFolderClick = (folder) => {
    console.log("Going to new folder");
    setSelectedFolder(folder); // Set the selected folder
  };

  const handleBackClick = () => {
    setSelectedFolder(null); // Go back to the main folder view
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2 className="font-bold text-3xl">Workspace</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {selectedFolder ? (
          <div>
            <button
              onClick={handleBackClick}
              className="text-blue-500 hover:underline mb-4"
            >
              Back to Folders
            </button>
            <h3 className="font-bold text-2xl">{selectedFolder.folderName}</h3>
            {/* Render files inside the selected folder */}
            <FileList
              files={selectedFolder.files.filter((file) =>
                file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              folderId={file.folderId}
            />
            {/* Render subfolders inside the selected folder */}
            <FolderList
              folders={selectedFolder.subfolders || []}
              onFileDrop={handleDrop}
            />
          </div>
        ) : (
          <div>
            {/* Render default files if no folder is selected */}
            {filteredDefaultFiles.length > 0 && (
              <FileList
                files={filteredDefaultFiles}
                folderId={filteredDefaultFiles[0]?.folderId}
              />
            )}
            {/* Render all folders if no folder is selected */}
            {filteredFolders.length > 0 && (
              <FolderList
                folders={filteredFolders}
                onFileDrop={handleDrop}
                onFolderClick={handleFolderClick} // Pass the click handler to each folder
              />
            )}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default NoteDashboard;
