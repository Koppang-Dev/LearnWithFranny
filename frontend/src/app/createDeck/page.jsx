"use client";
import { useRouter } from "next/navigation";

const CreateDeck = () => {
  const router = useRouter();

  // Handles Manual Deck Creation
  const handleCreateFromScratch = () => {
    router.push("/createDeckFromScratch");
  };

  // Transforms a previous uploaded document from the deck
  const handleTransformFromDocuments = () => {
    router.push("/transform-from-documents");
  };

  // User uploads a new document which is then transformed
  const handleUploadDocument = () => {
    router.push("/upload-document");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-5xl font-semibold mb-8">Create a New Deck</h1>

      {/* Button Container */}
      <div className="flex flex-col gap-6 w-full px-10">
        {/* Button for Create From Scratch */}
        <button
          onClick={handleCreateFromScratch}
          className="px-10 py-20 text-xl font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          Create From Scratch
        </button>

        {/* Button for Transform From Documents */}
        <button
          onClick={handleTransformFromDocuments}
          className="px-10 py-20 text-xl font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Transform From Documents
        </button>

        {/* Button for Upload Document */}
        <button
          onClick={handleUploadDocument}
          className="px-10 py-20 text-xl font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default CreateDeck;
