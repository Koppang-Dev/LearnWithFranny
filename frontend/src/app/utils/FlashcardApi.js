// Sending files for AI Generation
export const uploadFileForFlashcards = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/flashcard/upload`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log("Upload Error");
      console.log(error);
      return error;
    }

    const data = await response.text();
    return data;
  } catch (err) {
    console.error("Error generating flashcards with AI", err);
    throw new Error("Failed generating flashcards");
  }
};
