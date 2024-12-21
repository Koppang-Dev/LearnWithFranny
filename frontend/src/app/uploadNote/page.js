"use client";

import { useState } from "react";
import { uploadFile } from "../services/fileService";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check file type (MIME type or file extension)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setMessage(`File ${selectedFile.name} selected.`);
    } else {
      setFile(null);
      setMessage("Please upload a valid PDF or Word document.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a valid file to upload.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Try to upload the file to the backend
    try {
      await uploadFile(file);
      setMessage("File Loaded Successfully");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }

    // Continue with file upload process (you can send the file to the backend here)
    setMessage(`File ${file.name} is ready for upload.`);
  };

  return (
    <div>
      <h1>Upload Your Notes</h1>
      <input
        type="file"
        accept=".pdf, .doc, .docx" // Restrict file selection to PDF and Word files
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}
