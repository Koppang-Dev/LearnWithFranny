export const getReferralInformation = async () => {
  try {
    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referrals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error("Error getting referral information", err);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Error getting referral information", err);
  }
};
