"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PdfViewer from "../PdfViewer/page";

const DocumentPage = () => {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (router.query.fileUrl) {
      setFileUrl(router.query.fileUrl);
    }
  }, [router.query]);

  return (
    <div>
      <h1>Document Viewer</h1>
      {fileUrl && <PdfViewer fileUrl={fileUrl} />}
    </div>
  );
};

export default DocumentPage;
