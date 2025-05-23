import { cookies } from "next/headers";

export const getReferralInformation = async () => {
  const token = cookies().get("token")?.value;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/referrals`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
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
