import React, { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import SearchBar from "@/components/custom/SearchBar";
import { fetchDocuments, moveFileToFolder } from "@/app/utils/FileApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFolder } from "@/app/context/FolderProvider";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const NoteDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [defaultFolderFiles, setDefaultFolderFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const { currentFolder, setCurrentFolder } = useFolder();

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2 className="font-bold text-3xl">Workspace</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Table */}
        <div className="p-5">
          <Table className="w-full border border-gray-300 shadow-md">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-1/3">File Name</TableHead>
                <TableHead className="w-1/3">Last Modified</TableHead>
                <TableHead className="w-1/3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDefaultFiles.length > 0 ? (
                filteredDefaultFiles.map((file) => (
                  <TableRow key={file.fileId} className="hover:bg-gray-50">
                    <TableCell>{file.fileName}</TableCell>
                    <TableCell>{file.lastModified}</TableCell>
                    <TableCell className="text-right">
                      <button className="text-blue-500 hover:underline">
                        Open
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3" className="text-center py-4">
                    No files found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DndProvider>
  );
};

export default NoteDashboard;
