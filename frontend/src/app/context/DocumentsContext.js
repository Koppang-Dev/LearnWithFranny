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
        console.log("Pushed Folder:", doc.folderName);

        // Extract files from the folder's `files` array
        if (doc.files && Array.isArray(doc.files)) {
          files.push(...doc.files);
          console.log(
            `Pushed ${doc.files.length} Files from Folder:`,
            doc.folderName
          );
        }
      } else if (doc.fileId) {
        files.push(doc); // Save standalone file
        console.log("Pushed File:", doc.fileName);
      }

      // No need for `doc.children` recursion—files are inside `doc.files`
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
