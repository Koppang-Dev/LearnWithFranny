import { createContext, useContext, useState, useEffect } from "react";
import { fetchDocuments } from "../utils/FileApi";

const DocumentsContext = createContext();

// Holds all of the users documents
export const DocumentsProvider = ({ children }) => {
  const [allFiles, setAllFiles] = useState([]);
  const [allFolders, setAllFolders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentsData = async () => {
      try {
        // TEMPORARY USER ID
        const data = await fetchDocuments(10);

        // Extract the files
        const { folders, files } = extractFoldersAndFiles(data);

        // Save the folders and files
        setAllFiles(files);
        setAllFolders(folders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentsData();
  }, []);

  const extractFoldersAndFiles = (documents, folders = [], files = []) => {
    documents.forEach((doc) => {
      if (doc.folderId) {
        folders.push(doc); // Save folder
      } else if (doc.fileId) {
        files.push(doc); // Save file
      }

      // If the document has children (subfolders or files), recurse
      if (doc.children && Array.isArray(doc.children)) {
        extractFoldersAndFiles(doc.children, folders, files);
      }
    });

    return { folders, files };
  };

  return (
    <DocumentsContext.Provider value={{ allFiles, allFolders }}>
      {children}
    </DocumentsContext.Provider>
  );
};

export { DocumentsContext };
