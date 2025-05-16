"use server";

import { getCookies } from "./headerUtil";

export const fetchDocuments = async () => {
  const token = await getCookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/files`,
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
      console.log("Error fetching files", error);
      throw new Error(err);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error fetching files", err);
    throw new Error("Failed getting files");
  }
};
