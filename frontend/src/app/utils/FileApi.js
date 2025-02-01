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

/**
 * Renames a specified folder for the given user.
 *
 * @param {string} userId - The unique identifier of the user who owns the folder.
 * @param {string} folderId - The unique identifier of the folder to be renamed.
 * @param {string} newFolderName - The new name for the folder.
 * @returns {Promise<Object>} - A promise that resolves to the server's response in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const renameFolder = async (userId, folderId, newFolderName) => {
  const requestData = {
    userId,
    folderId,
    newFolderName,
  };

  // Make an HTTP PUT request to rename the specified folder
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/folder/rename`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }
  );

  if (!response.ok) throw new Error("Failed to rename folder");

  return await response.text();
};

/**
 * Renames a specified file for the given user.
 *
 * @param {string} userId - The unique identifier of the user who owns the file.
 * @param {string} oldFileName - The current name of the file to be renamed.
 * @param {string} newFileName - The new name for the file.
 * @param {string} folderId - The unique identifier of the folder where the file is located.
 * @returns {Promise<Object>} - A promise that resolves to the server's response in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const renameFile = async (userId, fileId, newFileName) => {
  const requestData = {
    userId,
    fileId,
    newFileName,
  };

  // Make an HTTP PUT request to rename the specified file
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/rename`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }
  );

  if (!response.ok) throw new Error("Failed to rename file");

  return await response.text();
};

/**
 * Moves a specified file to a different folder for the given user.
 *
 * @param {string} userId - The unique identifier of the user who owns the file.
 * @param {string} fileId - The unique identifier of the file to be moved.
 * @param {string} fromFolderId - The ID of the folder the file is currently in.
 * @param {string} toFolderId - The ID of the folder where the file will be moved.
 * @returns {Promise<Object>} - A promise that resolves to the server's response in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const moveFileToFolder = async (
  userId,
  fileId,
  fromFolderId,
  toFolderId
) => {
  const requestData = {
    userId,
    fileId,
    fromFolderId,
    toFolderId,
  };

  // Make an HTTP PUT request to move the file
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/move`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }
  );

  if (!response.ok) throw new Error("Failed to move file");

  return await response.text();
};

/**
 * Downloads a specified file for the given user.
 *
 * @param {string} userId - The unique identifier of the user who owns the file.
 * @param {string} fileId - The unique identifier of the file to be downloaded.
 * @returns {Promise<void>} - A promise that resolves when the file is downloaded.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const downloadFile = async (fileId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/download`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      }
    );

    if (response.ok) {
      const blob = await response.blob(); // Get the file blob
      return blob; // Return the blob to be handled by handleDownload
    } else {
      console.error("Error downloading file:", response.statusText);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
