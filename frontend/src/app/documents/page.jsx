// DocumentPage displays the file management dashboard
// Server side fetching for the documents
// Rendering the client component since it uses useContext for multiple items
import { fetchDocuments } from "../utils/FileServerApi";
import DocumentClientWrapper from "./DocumentClientWrapper";

const DocumentPage = async () => {
  const documents = await fetchDocuments();
  return <DocumentClientWrapper initialDocuments={documents} />;
};
export default DocumentPage;
