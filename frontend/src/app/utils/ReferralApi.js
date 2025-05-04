export const getReferralInformation = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/referrals`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Error getting referral information");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching referral info:", err);
    throw new Error("Error getting referral information");
  }
};
