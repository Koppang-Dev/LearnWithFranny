"use client";
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "@/components/custom/SearchBar";
import FileList from "./FileList";
import FolderList from "./FolderList";
import { moveFileToFolder } from "@/app/utils/FileApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFolder } from "@/app/context/FolderProvider";
import { DocumentsContext } from "@/app/context/DocumentsContext";
import { DataTable } from "./DataTable/DataTable";
import { fileColumns } from "./DataTable/Columns";
import { Table, LayoutGrid } from "lucide-react";
import RecentFileCard from "./RecentFileCard";

const DocumentDashboard = ({ initialDocuments }) => {
  const { setCurrentFolder } = useFolder();
  const { allFiles } = useContext(DocumentsContext);
  const [folderStack, setFolderStack] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [defaultFolderFiles, setDefaultFolderFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTableView, setIsTableView] = useState(false);

  useEffect(() => {
    const defaultFolder = initialDocuments.find(
      (folder) => folder.folderName === "Default Folder"
    );
    setDefaultFolderFiles(defaultFolder?.files || []);
    setDocuments(
      initialDocuments.filter(
        (folder) => folder.folderName !== "Default Folder"
      )
    );
  }, [initialDocuments]);

  const filteredDefaultFiles = defaultFolderFiles.filter((file) =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFolders = documents.filter((folder) =>
    folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rootFolders = filteredFolders.filter(
    (folder) => !folder.parentFolderId
  );

  const findSubfolders = (parentFolderId) => {
    return filteredFolders.filter(
      (folder) => folder.parentFolderId === parentFolderId
    );
  };

  const handleDrop = async (item, targetFolderId) => {
    try {
      await moveFileToFolder(item.id, item.folderId, targetFolderId);
      window.location.reload();
    } catch (error) {
      console.error("Error moving file:", error);
    }
  };

  const handleFolderClick = (folder) => {
    setFolderStack((prev) => [...prev, folder]);
    setSelectedFolder(folder);
    setCurrentFolder(folder);
  };

  const handleBackClick = () => {
    setFolderStack((prev) => {
      const updatedStack = [...prev];
      updatedStack.pop();
      const parent = updatedStack[updatedStack.length - 1] || null;
      setSelectedFolder(parent);
      setCurrentFolder(parent);
      return updatedStack;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="mt-10 pr-20">
        {/* Header + Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            All Documents
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsTableView(false)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
                isTableView
                  ? "bg-gray-200 text-black"
                  : "bg-purple-500 text-white"
              }`}
            >
              <LayoutGrid size={18} />
              Folder View
            </button>
            <button
              onClick={() => setIsTableView(true)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
                isTableView
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <Table size={18} />
              Table View
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Table View */}
        {isTableView ? (
          <div className="w-full bg-white border rounded-lg p-4 shadow-sm">
            <DataTable columns={fileColumns} data={allFiles} />
          </div>
        ) : selectedFolder ? (
          <div>
            <button
              onClick={handleBackClick}
              className="text-purple-500 hover:underline mb-4 text-sm"
            >
              ← Back to{" "}
              {folderStack.length > 1 ? "previous folder" : "all documents"}
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {selectedFolder.folderName}'s Documents
            </h3>

            <div className="space-y-10">
              {/* Subfolders inside selected folder */}
              {findSubfolders(selectedFolder.folderId).length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    Folders
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {findSubfolders(selectedFolder.folderId).map((folder) => (
                      <div key={folder.folderId}>
                        <div
                          onClick={() => handleFolderClick(folder)}
                          className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                          <p className="font-medium text-gray-800">
                            {folder.folderName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {folder.files?.length || 0} file(s)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files inside selected folder */}
              {selectedFolder.files?.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    Files
                  </h4>
                  <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-visible">
                    {selectedFolder.files
                      .filter((file) =>
                        file.fileName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((file) => (
                        <div key={file.fileId}>
                          <RecentFileCard file={file} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Folders */}
            {rootFolders.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Folders
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {rootFolders.map((folder) => (
                    <div key={folder.folderId}>
                      <div
                        onClick={() => handleFolderClick(folder)}
                        className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                      >
                        <p className="font-medium text-gray-800">
                          {folder.folderName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {folder.files?.length || 0} file(s)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Files */}
            {filteredDefaultFiles.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Files
                </h4>
                <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-visible">
                  {filteredDefaultFiles.map((file) => (
                    <div
                      key={file.fileId}
                      className="relative overflow-visible"
                    >
                      <RecentFileCard file={file} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </DndProvider>
  );
};

export default DocumentDashboard;
