"use client";
import { FolderProvider } from "../context/FolderProvider";
import { DocumentsProvider } from "../context/DocumentsContext";
import FileHeader from "./_components/FileHeader";
import RecentlyModifiedSection from "./_components/RecentlyModified";
import DocumentDashboard from "./_components/DocumentDashboard";
import { useState } from "react";

export default function DocumentClientWrapper({ initialDocuments }) {
  const [documents, setDocuments] = useState(initialDocuments);

  // Fetching the most recently uploaded documents
  const recentFiles = documents
    .flatMap((folder) => folder.files || [])
    .filter((file) => file.createdDate)
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, 3);

  return (
    <FolderProvider>
      <DocumentsProvider>
        <div className="flex flex-col gap-10  mb-40">
          <div className="flex flex-col pl-20 pt-8 gap-10">
            <h1 className="text-4xl font-semibold">
              Manage Your Study Materials
            </h1>
            <FileHeader />
            <RecentlyModifiedSection files={recentFiles} />
            <DocumentDashboard
              documents={documents}
              setDocuments={setDocuments}
            />
          </div>
        </div>
      </DocumentsProvider>
    </FolderProvider>
  );
}
