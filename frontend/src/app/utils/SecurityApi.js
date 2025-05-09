import { getCookies } from "./headerUtil";

// Information for the security page
export const getSecurityInformation = async () => {
  const token = await getCookies();
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
      const data = await response.text();
      console.log("Error retriving information", data);
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
