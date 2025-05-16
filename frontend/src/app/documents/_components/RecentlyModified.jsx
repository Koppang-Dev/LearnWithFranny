"use client";

import RecentFileCard from "./RecentFileCard";

const RecentlyModifiedSection = ({ files }) => {
  if (!files || files.length === 0) {
    return (
      <div>
        <h2 className="font-semibold text-2xl">Recently Uploaded</h2>
        <p className="text-gray-500 mt-2">No recent documents found.</p>
      </div>
    );
  }
  return (
    <div className="mt-6">
      <h2 className="font-semibold text-2xl mb-4">Recently Uploaded</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mr-20">
        {files.map((file) => (
          <RecentFileCard key={file.fileId} file={file} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyModifiedSection;
