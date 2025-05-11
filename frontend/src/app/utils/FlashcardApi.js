// Sending files for AI Generation
export const uploadFileForFlashcards = async (file) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/download`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(file),
      }
    );

    if (!response.ok) {
      const error = await response.text();
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
