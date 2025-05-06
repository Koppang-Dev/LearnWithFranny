import { cookies } from "next/headers";
export const getCookies = () => {
  const token = cookies().get("token")?.value;
  return token;
};
