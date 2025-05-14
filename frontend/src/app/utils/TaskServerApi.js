"use server";
import { getCookies } from "./headerUtil";
import { format, addDays } from "date-fns";

// Retrieiving upcoming tasks (within 7 days)
export const getUpcomingTasks = async (daysAhead = 7) => {
  const token = await getCookies();
  const start = new Date();
  const end = addDays(start, daysAhead);

  const formattedStart = format(start, "yyyy-MM-dd");
  const formattedEnd = format(end, "yyyy-MM-dd");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/range?start=${formattedStart}&end=${formattedEnd}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60,
        },
      }
    );

    //   Validation
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error(error);
    }

    const data = await response.json();
    console.log("Server tasks", data);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
