"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import SearchBar from "@/components/custom/SearchBar";
import FileList from "./FileList";
import FolderList from "./FolderList";
import { fetchDocuments, moveFileToFolder } from "@/app/utils/FileApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFolder } from "@/app/context/FolderProvider";
import TableView from "./DataTable/TableView";
import { DataTable } from "./DataTable/DataTable";
import { columns, fileColumns, folderColumns } from "./DataTable/Columns";
import { DocumentsContext } from "@/app/context/DocumentsContext";
import { useContext } from "react";
import { Table, LayoutGrid } from "lucide-react";

const NoteDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null); // Track selected folder
  const [defaultFolderFiles, setDefaultFolderFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const { currentFolder, setCurrentFolder } = useFolder();
  const [isTableView, setIsTableView] = useState(false);
  const { allFiles, allFolders } = useContext(DocumentsContext);

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
        console.log("Fetched Data:", data);
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
    setCurrentFolder(folder);
  };

  const handleBackClick = () => {
    setSelectedFolder(null); // Go back to the main folder view
  };

  const rootFolders = filteredFolders.filter(
    (folder) => !folder.parentFolderId
  );

  // Find the subfolders for a given parent folder
  const findSubfolders = (parentFolderId) => {
    return filteredFolders.filter(
      (folder) => folder.parentFolderId === parentFolderId
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-0">
        <h2 className="font-bold text-2xl">All Documents</h2>

        {/* Move SearchBar to the top */}
        <div className="my-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Toggle between Table view and file/folder view */}
        <div className="flex gap-2 my-4">
          <button
            onClick={() => setIsTableView(false)}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
              isTableView
                ? "bg-gray-200 text-black"
                : "bg-purple-500 text-white"
            }`}
          >
            <LayoutGrid size={20} />
            <span>Folder View</span>
          </button>

          <button
            onClick={() => setIsTableView(true)}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
              isTableView
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <Table size={20} />
            <span>Table View</span>
          </button>
        </div>

        {/* Handling when it is a table view */}
        {isTableView ? (
          <div className="w-4/4 flex flex-col justify-center mr-20">
            <DataTable columns={fileColumns} data={allFiles} />
          </div>
        ) : selectedFolder ? (
          <div>
            <button
              onClick={handleBackClick}
              className="text-purple-500 hover:underline mb-4"
            >
              Back to previous folder
            </button>
            <h3 className="font-bold text-3xl">
              {selectedFolder.folderName}'s' Documents
            </h3>
            {/* Render files inside the selected folder */}
            <FileList
              files={selectedFolder.files.filter((file) =>
                file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              folderId={filteredDefaultFiles[0]?.folderId}
            />
            {/* Render subfolders inside the selected folder */}
            {findSubfolders(selectedFolder.folderId).length > 0 && (
              <FolderList
                folders={findSubfolders(selectedFolder.folderId)}
                onFileDrop={handleDrop}
                onFolderClick={handleFolderClick} // Handle subfolder click
              />
            )}
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
            {/* Render root folders if no folder is selected */}
            {rootFolders.length > 0 && (
              <FolderList
                folders={rootFolders}
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
