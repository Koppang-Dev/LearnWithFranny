"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFileForFlashcards } from "@/app/utils/FlashcardApi";
import toast from "react-hot-toast";

export default function UploadFlashcardPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);

    try {
      await uploadFileForFlashcards(file);
      toast.success("Flashcards generated successfully!");
      setTimeout(() => {
        router.push("/flashcard");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-10 flex flex-col gap-6 border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Upload Document
          </h1>
          <p className="text-gray-500 text-sm">
            Upload a PDF or Word file and our AI will generate flashcards from
            it.
          </p>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Generate Flashcards"}
        </button>
      </div>
    </div>
  );
}
