/**
 * Fetches a list of documents for the specified user.
 *
 * @param {string} userId - The unique identifier of the user whose documents need to be fetched.
 * @returns {Promise<Object[]>} - A promise that resolves to the list of documents in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
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

/**
 * Deletes a specified file for the given user.
 *
 * @param {string} userId - The unique identifier of the user who owns the file.
 * @param {string} fileName - The name of the file to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the server's response in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const deleteFile = async (userId, fileName, folderId) => {
  const requestData = {
    userId,
    fileName,
    folderId,
  };

  // Make an HTTP DELETE request to delete the specified file for the user
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/file`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });
  if (!response.ok) throw new Error("Failed to delete file");

  return await response.text();
};

/**
 * Deletes a specified folder for the given user.
 *
 * @param {string} userId - The unique identifier of the user who owns the folder.
 * @param {string} folderId - The unique identifier of the folder to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the server's response in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const deleteFolder = async (userId, folderId) => {
  const requestData = {
    userId,
    folderId,
  };

  // Make an HTTP DELETE request to delete the specified folder for the user
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/folder/delete`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }
  );

  // Check if the response is not OK
  if (!response.ok) throw new Error("Failed to delete folder");

  // Return the response text (success or error message)
  return await response.text();
};
