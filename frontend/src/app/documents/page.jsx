import { Suspense } from "react";
import { fetchDocuments } from "../utils/FileServerApi";
import DocumentClientWrapper from "./DocumentClientWrapper";
import LoadingSkeleton from "./_components/LoadingSkeleton";

const DocumentPage = async () => {
  const documents = await fetchDocuments();

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DocumentClientWrapper initialDocuments={documents} />
    </Suspense>
  );
};

export default DocumentPage;
