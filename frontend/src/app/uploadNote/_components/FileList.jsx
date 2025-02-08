import React from "react";
import FileCard from "./FileCard";

const FileList = ({ files, folderId }) => (
  <div className="mt-10 mr-5">
    <h3 className="font-bold text-2xl mb-4">Files</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {files.map((file) => (
        <FileCard
          key={`${file.fileId}-${file.name}`}
          file={file}
          folderId={folderId}
        />
      ))}
    </div>
  </div>
);

export default FileList;
