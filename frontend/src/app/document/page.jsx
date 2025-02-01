import { useRouter } from "next/router";
import PdfViewer from "../../components/PdfViewer";

const DocumentPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const fileUrl = router.query.fileUrl; // URL passed as query param

  return (
    <div>
      <h1>Document Viewer</h1>
      {fileUrl && <PdfViewer fileUrl={fileUrl} />}
    </div>
  );
};

export default DocumentPage;
