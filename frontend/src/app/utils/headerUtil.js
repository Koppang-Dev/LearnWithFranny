"use server";
import { cookies } from "next/headers";
export const getCookies = async () => {
  const token = cookies().get("token")?.value;
  return token;
};
