import React from "react";

const TableView = ({ documents, defaultFiles }) => {
  return (
    <div>
      <h3 className="font-bold text-2xl">Table View</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">File Name</th>
            <th className="border px-4 py-2">Folder</th>
          </tr>
        </thead>
        <tbody>
          {defaultFiles.map((file) => (
            <tr key={file.id} className="border">
              <td className="border px-4 py-2">{file.fileName}</td>
              <td className="border px-4 py-2">Default Folder</td>
            </tr>
          ))}
          {documents.map((folder) =>
            folder.files.map((file) => (
              <tr key={file.id} className="border">
                <td className="border px-4 py-2">{file.fileName}</td>
                <td className="border px-4 py-2">{folder.folderName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
