import { createContext, useContext, useState, useEffect } from "react";
import { fetchDocuments } from "../utils/FileApi";

const DocumentsContext = createContext();

// Holds all of the users documents
export const DocumentsProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentsData = async () => {
      try {
        // TEMPORARY USER ID
        const data = await fetchDocuments(10);
        setDocuments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentsData();
  }, []);

  return (
    <DocumentsContext.Provider value={{ documents, loading, error }}>
      {children}
    </DocumentsContext.Provider>
  );
};

export { DocumentsContext };
