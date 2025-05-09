/**
 * Sends a request to the backend to create a new deck for a user.
 *
 * @param {string} userId - The unique identifier of the user creating the deck.
 * @param {Object} deckData - The deck data (e.g., deck name, description, etc.).
 * @returns {Promise<Object>} - A promise that resolves to the created deck object.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const createUserDeck = async (deck) => {
  console.log(deck);
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

    const data = await response.json();
    console.log("API Response", data);
    return data;
  } catch (error) {
    console.error("Error get deck", error);
  }
};

// Getting all cards for a deck
export const deleteDeck = async (deckId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/deck/${deckId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) throw new Error("Failed to delete deck");

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Failed to delete deck", error);
  }
};

// Getting Deck By Id
export const getDeckById = async (deckId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/deck/${deckId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) throw new Error("Failed to get deck");

    const data = await response.json();
    console.log("Deck by id", data);
    return data;
  } catch (error) {
    console.error("Failed to get deck", error);
    throw error;
  }
};

// Updating a deck
export const updateDeck = async (deckId, payload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/deck/${deckId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to update deck", error);
      throw new Error("Failed to update deck");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failedddd to delete deck", error);
  }
};
