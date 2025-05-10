import { getCookies } from "./headerUtil";
export const fetchNotificationPreferences = async () => {
  const token = await getCookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notification`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const data = await response.text();
      console.log("Error retriving notification preferences", data);
      throw new Error("Failed getting notification preferences");
    }

    const data = await response.json();
    console.log("Notification Data", data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw new Error("Failed getting notification preferences");
  }
};
