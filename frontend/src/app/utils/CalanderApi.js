import { format } from "date-fns";

export async function getTasksInRange(start, end) {
  const formattedStart = format(start, "yyyy-MM-dd");
  const formattedEnd = format(end, "yyyy-MM-dd");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/range?start=${formattedStart}&end=${formattedEnd}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    //   Validation
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error(error);
    }

    const tasks = await response.json();
    console.log("Tasks", tasks);
    return tasks;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

// Creating a task
export const createTask = async (data) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const message = await response.text();
    return message;
  } catch (err) {
    throw new Error(err);
  }
};

// Deleting a task
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const message = await response.text();
    return message;
  } catch (err) {
    throw new Error(err);
  }
};
