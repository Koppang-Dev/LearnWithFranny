"use server";
import { getCookies } from "./headerUtil";

// Retrieiving all the general data from user
export const fetchGeneralData = async () => {
  const token = await getCookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/preferences`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      throw new Error("Failed to get general data");
    }

    const data = await response.json();
    console.log("General Data", data);

    return data;
  } catch (err) {
    console.log("Error fetching general data", err);
    throw new Error(err);
  }
};

// Grabbing information to set user context (username, email)
export const getUserContext = async () => {
  const token = await getCookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-context`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Checking response
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      throw new Error("Failed to get user data");
    }

    // Returning user context

    const data = await response.json();
    console.log("user context", data);
    return data;
  } catch (err) {
    console.log("Failed getting user context", err);
    throw new Error(err);
  }
};
