import { cookies } from "next/headers";

// Information for the security page
export const getSecurityInformation = async () => {
  const token = cookies().get("token")?.value;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/security`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log("Error retriving information");
      throw new Error("Failed getting security information");
    }

    const data = await response.json();
    console.log("Security Data", data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw new Error(`Failed getting security information: ${err}`);
  }
};
