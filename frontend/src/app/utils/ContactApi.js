export const sendContactMessage = async (formData) => {
  // Send Request
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      }
    );

    if (!response.ok) {
      const error = response.text();
      console.error("Contact Message Error:", error);
      throw new Error("Failed to send contact message.");
    }
    console.log("Sent");
    return await response.text();
  } catch (err) {
    console.error("Contact Message Error:", err);
    throw new Error("Failed to send contact message.");
  }
};
