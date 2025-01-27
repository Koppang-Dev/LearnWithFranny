import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import SearchBar from "@/components/custom/SearchBar";
import { FaFolder } from "react-icons/fa";

const NoteDashboard = () => {
  const [documents, setDocuments] = useState([]); // State to hold documents
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [defaultFolderFiles, setDefaultFolderFiles] = useState([]); // Used for files not in a folder

  const { user } = useUser();
  const userId = user?.id ?? 10;

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
        console.log("Fetched data:", data); // Log the data returned by the API

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

        console.log("Default files:", defaultFiles); // Log the data returned by the API
        console.log("Formatetd Data:", formattedDocuments); // Log the data returned by the API

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
                className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
              >
                <Image
                  src="/images/pdf-file.png"
                  alt=""
                  width={50}
                  height={50}
                />
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
                className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
              >
                <FaFolder width={50} height={50} />
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
