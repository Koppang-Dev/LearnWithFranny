export const fetchDocuments = async (userId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/${userId}/files`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch documents");
  return response.json();
};
