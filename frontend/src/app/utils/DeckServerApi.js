"use server";
import { getCookies } from "./headerUtil";

// Retrieving all the decks from a user
export const getUserDecks = async () => {
  const token = await getCookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/deck`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log("Error fetching decks", error);
      throw new Error(err);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error fetching decks", err);
    throw new Error("Failed getting decks");
  }
};
