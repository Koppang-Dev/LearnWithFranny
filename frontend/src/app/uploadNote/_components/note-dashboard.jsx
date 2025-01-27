import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import SearchBar from "@/components/custom/SearchBar";

const NoteDashboard = () => {
  const [documents, setDocuments] = useState([]); // State to hold documents
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering

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

        // Mapping over each file in each folder
        const formattedDocuments = data.map((folder) => ({
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

        console.log("Formatetd Data:", formattedDocuments); // Log the data returned by the API

        // Set the documents state with the fetched data
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
  const filteredDocuments = documents
    .map((folder) => ({
      ...folder,
      files: folder.files.filter((file) =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((folder) => folder.files.length > 0); // Only include folders with matching files

  filteredDocuments.forEach((folder) => {
    console.log("Folder ID:", folder.folderId);
    folder.files.forEach((file) => {
      console.log("File ID:", file.fileId);
    });
  });
  return (
    <div>
      <div className="">
        <h2 className="font-bold text-3xl mr-auto">Workspace</h2>
        <div className="w-full flex justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
        {filteredDocuments.map((folder) => (
          <div
            key={folder.folderId}
            className="flex flex-col p-5 shadow-md rounded-md"
          >
            <h3 className="font-bold text-xl mb-4">{folder.folderName}</h3>
            {/* Loop through the files in each folder */}
            {folder.files.map((file) => (
              <div
                key={`${folder.folderId}-${file.fileId}`}
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
        ))}
      </div>
    </div>
  );
};

export default NoteDashboard;
