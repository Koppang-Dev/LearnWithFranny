import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import SearchBar from "@/components/custom/SearchBar";
import { FaFolder, FaEllipsisV } from "react-icons/fa";

const NoteDashboard = () => {
  const [documents, setDocuments] = useState([]); // State to hold documents
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [defaultFolderFiles, setDefaultFolderFiles] = useState([]); // Used for files not in a folder
  const [activeFile, setActiveFile] = useState(null); // Track which file is active
  const [activeFolder, setActiveFolder] = useState(null); // Track which folder is active
  const [showFileDropdown, setShowFileDropdown] = useState(false); // When the user clicks on the more button for files
  const [showFolderDropdown, setShowFolderDropdown] = useState(false); // When the user clicks on the more button for folders
  const { user } = useUser();
  const userId = user?.id ?? 10;

  // Handle dropdown toggle for each file
  const toggleFileDropdown = (fileUrl) => {
    setActiveFile(fileUrl);
    setShowFileDropdown((prev) => (prev !== fileUrl ? fileUrl : null)); // Toggle the dropdown for the specific file
  };

  // Handle dropdown toggle for each folder
  const toggleFolderDropdown = (folderId) => {
    setActiveFolder(folderId);
    setShowFolderDropdown((prev) => (prev !== folderId ? folderId : null)); // Toggle the dropdown for the specific folder
  };

  // Handle action selection
  const handleAction = (action) => {
    console.log(`${action} clicked for ${activeFile || activeFolder}`);
    setShowFileDropdown(false); // Close file dropdown after action
    setShowFolderDropdown(false); // Close folder dropdown after action
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const folderList = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/file/${userId}/files`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await folderList.json();

        // Separate files in the "Default Folder"
        const defaultFolder = data.find(
          (folder) => folder.folderName === "Default Folder"
        );
        const defaultFiles = defaultFolder ? defaultFolder.files : [];

        // Mapping over each file in each folder
        const formattedDocuments = data
          .filter((folder) => folder.folderName !== "Default Folder")
          .map((folder) => ({
            folderId: folder.folderId,
            folderName: folder.folderName,
            files: folder.files.map((file) => ({
              fileId: file.id,
              fileName: file.fileName,
              fileUrl: file.fileUrl,
              fileType: file.fileType,
              fileSize: file.fileSize,
            })),
          }));

        // Set the documents state with the fetched data
        setDefaultFolderFiles(defaultFiles);
        setDocuments(formattedDocuments);
        setLoading(false);
      } catch (err) {
        // Handle errors
        setError("Failed to load documents");
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []); // Run once when component mounts

  if (loading) {
    return <div>Loading documents...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter documents based on search term
  const filteredDefaultFiles = defaultFolderFiles.filter((file) =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFolders = documents.filter((folder) =>
    folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="">
        <h2 className="font-bold text-3xl mr-auto">Workspace</h2>
        <div className="w-full flex justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Render files from "Default Folder" */}
      {filteredDefaultFiles.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold text-2xl mb-4">Files</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredDefaultFiles.map((file) => (
              <div
                key={file.fileUrl}
                className="relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
                onMouseEnter={() => setActiveFile(file.fileUrl)} // Show dropdown when hovered
                onMouseLeave={() => setActiveFile(null)} // Hide dropdown when mouse leaves
              >
                {/* PDF Image */}
                <Image
                  src="/images/pdf-file.png"
                  alt=""
                  width={50}
                  height={50}
                />

                {/* More Options Button */}
                <div className="absolute top-2 right-2">
                  <FaEllipsisV
                    className="cursor-pointer"
                    onClick={() => toggleFileDropdown(file.fileUrl)} // Toggle dropdown for this specific file
                  />
                </div>

                {/* Dropdown menu */}
                {showFileDropdown === file.fileUrl && (
                  <div className="absolute top-8 right-0 bg-white border shadow-md rounded-md w-40">
                    <ul className="list-none p-2">
                      <li
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAction("Rename")}
                      >
                        Rename
                      </li>
                      <li
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAction("Delete")}
                      >
                        Delete
                      </li>
                      <li
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAction("Share")}
                      >
                        Share
                      </li>
                    </ul>
                  </div>
                )}
                <h2 className="mt-3 font-medium text-xl">{file.fileName}</h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Each Folder */}
      {filteredFolders.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold text-2xl mb-4">Folders</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredFolders.map((folder) => (
              <div
                key={folder.folderId}
                className="relative flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
                onMouseEnter={() => setActiveFolder(folder.folderId)} // Show dropdown when hovered
                onMouseLeave={() => setActiveFolder(null)} // Hide dropdown when mouse leaves
              >
                <FaFolder width={50} height={50} />
                {/* More Options Button */}
                <div className="absolute top-2 right-2">
                  <FaEllipsisV
                    className="cursor-pointer"
                    onClick={() => toggleFolderDropdown(folder.folderId)} // Toggle dropdown for this specific folder
                  />
                </div>

                {/* Dropdown menu */}
                {showFolderDropdown === folder.folderId && (
                  <div className="absolute top-8 right-0 bg-white border shadow-md rounded-md w-40">
                    <ul className="list-none p-2">
                      <li
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAction("Rename")}
                      >
                        Rename
                      </li>
                      <li
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAction("Delete")}
                      >
                        Delete
                      </li>
                      <li
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleAction("Share")}
                      >
                        Share
                      </li>
                    </ul>
                  </div>
                )}
                <h2 className="mt-3 font-medium text-xl">
                  {folder.folderName}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDashboard;
