import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import SearchBar from "@/components/custom/SearchBar";
import FileList from "./FileList";
import FolderList from "./FolderList";
import { fetchDocuments } from "@/app/utils/FileApi";

const NoteDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [defaultFolderFiles, setDefaultFolderFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const userId = user?.id ?? 10;

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

  return (
    <div>
      <h2 className="font-bold text-3xl">Workspace</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredDefaultFiles.length > 0 && (
        <FileList files={filteredDefaultFiles} />
      )}
      {filteredFolders.length > 0 && <FolderList folders={filteredFolders} />}
    </div>
  );
};

export default NoteDashboard;
