import Image from "next/image";
import React, { useEffect, useState } from "react";

const NoteDashboard = ({ userId }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const fileList = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/file/10/files`,
          {
            method: "GET", // Method is optional, GET is the default
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!fileList.ok) {
          // If response status is not 2xx, throw an error
          throw new Error("Failed to load documents");
        }

        // Parse the JSON response
        const data = await fileList.json();

        // Set the documents state with the fetched data
        setDocuments(data);
        setLoading(false);
      } catch (err) {
        // Handle errors
        setError("Failed to load documents");
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading documents...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-3xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
        {documents.map((file) => (
          <div
            key={file.id}
            className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all"
          >
            <Image src="/images/pdf-file.png" alt="" width={50} height={50} />
            <h2 className="mt-3 font-medium text-xl">{file.fileName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteDashboard;
