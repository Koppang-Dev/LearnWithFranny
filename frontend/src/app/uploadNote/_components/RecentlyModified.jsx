"use client";

import { useContext } from "react";
import { DocumentsContext } from "@/app/context/DocumentsContext";
import RecentFileCard from "./RecentFileCard";

const RecentlyModifiedSection = () => {
  const { allFiles, allFolders } = useContext(DocumentsContext);
  const recentDocuments = allFolders.slice(0, 3);

  // If no documents are found
  if (recentDocuments.length === 0) {
    return (
      <div>
        <h2 className="font-semibold text-3xl">Recently Modified</h2>
        <p>No recent documents found</p>
      </div>
    );
  }
  return (
    <div>
      <div>
        {/* Header */}
        <h2 className="font-semibold text-2xl">Recently Modified</h2>
        {/* File List */}
        <div className="flex items-center gap-5 justify-between h-24 mt-5 mr-20">
          {recentDocuments.map((doc, index) => (
            <div key={index} className="w-full">
              <RecentFileCard key={doc.fileId} file={doc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyModifiedSection;
