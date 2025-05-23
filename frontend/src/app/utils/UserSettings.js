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

// Log out of all sessions
export const revokeSessions = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/security/logout-all-sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error("Error revoking sessions");
    }

    const data = await response.text();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Error revoking sessions");
  }
};
