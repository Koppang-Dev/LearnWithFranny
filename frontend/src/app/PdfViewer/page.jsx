import { useState } from "react";
import { Document, Page } from "react-pdf";
import { useRouter } from "next/router";

const PdfViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div style={{ textAlign: "center" }}>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
