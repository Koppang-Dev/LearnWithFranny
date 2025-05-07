export const updateNotificationPreferences = async (preferences) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notification/update-preferences`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(preferences),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Error updating preferences", err);
      console.log("Error", error);
      throw new Error(error);
    }

    const data = response.text();
    return data;
  } catch (err) {
    console.error(err);
    console.log("Error", err);
  }
};
