// Handling difficulty selection for flashcard
export const handleFlashcardDifficulty = async (difficulty, cardId) => {
  // Initalizing payload
  const payload = {
    cardId: cardId,
    difficulty: difficulty,
  };

  console.log("Payload:", payload);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/study/record`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Error updating flashcard difficulty", error);
      throw new Error();
    }

    // Returning resposne
    const responseText = await response.text();
    return responseText;
  } catch (err) {
    console.error("Error updating flashcard difficulty", err);
    throw new Error();
  }
};
