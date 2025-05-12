import { getCookies } from "./headerUtil";

export const fetchUserStats = async () => {
  const token = await getCookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/stats`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      const data = await response.text();
      console.log("Error retriving user stats", data);
      throw new Error("Failed getting user stats");
    }

    const data = await response.json();
    console.log("User statistics", data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw new Error("Failed getting user statistics");
  }
};
