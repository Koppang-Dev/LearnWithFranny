"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PdfViewer from "../PdfViewer/page";

const DocumentPage = () => {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    // Ensure the query is available and update the state
    if (router.query.fileUrl) {
      setFileUrl(router.query.fileUrl);
    }
  }, [router.query]); // Dependency ensures effect runs when query changes

  // Wait for the query to be ready
  if (!fileUrl) {
    return <div>Loading...</div>; // or a placeholder
  }

  return (
    <div>
      <h1>Document Viewer</h1>
      <PdfViewer fileUrl={fileUrl} />
    </div>
  );
};

export default DocumentPage;
