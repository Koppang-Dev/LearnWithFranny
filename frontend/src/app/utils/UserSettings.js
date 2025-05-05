// Toggle 2FA
export const toggle2FA = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/security/toggle-2fa`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed Updating 2FA");
    }

    const data = await response.text();
    return data;
  } catch (err) {
    throw new Error("Failed Updating 2FA");
  }
};
