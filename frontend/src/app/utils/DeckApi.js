/**
 * Sends a request to the backend to create a new deck for a user.
 *
 * @param {string} userId - The unique identifier of the user creating the deck.
 * @param {Object} deckData - The deck data (e.g., deck name, description, etc.).
 * @returns {Promise<Object>} - A promise that resolves to the created deck object.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const createUserDeck = async (deck) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deck`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  });

  if (!response.ok) throw new Error("Failed to create deck");

  // Log the response text to check its content
  const responseText = await response.text();
  console.log(responseText); // This will log the raw response
};

// Retrieving all the decks from a user
export const getUserDecks = async (userId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/deck/${userId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Failed to fetch decks");

  // Parse and return the response as JSON
  return await response.json();
};

// Getting all cards for a deck
export const getDeckCards = async (deckId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/deck/cards/${deckId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) throw new Error("Failed to get cards");

    const data = await response.json;
    console.log("API Response", data);
    return await response.json();
  } catch (error) {
    console.error("Error get deck", error);
  }
};
