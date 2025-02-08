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
        <h2 className="font-semibold text-3xl pb-10 pl-10">
          Recently Modified
        </h2>
        <p>No recent documents found</p>
      </div>
    );
  }
  return (
    <div>
      <div>
        {/* Header */}
        <h2 className="font-semibold text-2xl pl-10">Recently Modified</h2>
        {/* File List */}
        <div className="flex gap-5 w-full justify-evenly pt-10 h-24">
          {recentDocuments.map((doc, index) => (
            <div key={index} className="w-1/4">
              <RecentFileCard key={doc.fileId} file={doc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyModifiedSection;
