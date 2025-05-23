/**
 * Deletes a specified file for the given user.
 *
 * @param {string} userId - The unique identifier of the user who owns the file.
 * @param {string} fileName - The name of the file to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the server's response in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const deleteFile = async (fileId) => {
  // Make an HTTP DELETE request to delete the specified file for the user
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/files/${fileId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
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
export const deleteFolder = async (folderId) => {
  // Make an HTTP DELETE request to delete the specified folder for the user
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/files/folder/delete/${folderId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/files/folder/rename`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    }
  );

  if (!response.ok) throw new Error("Failed to rename folder");

  return await response.text();
};

// Renaming a file
export const renameFile = async (fileId, newFileName) => {
  const requestData = {
    fileId,
    newFileName,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/files/rename`,
    {
      method: "PUT",
      credentials: "include",
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/files/move`,
    {
      method: "PUT",
      credentials: "include",
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/files/download`,
      {
        method: "POST",
        credentials: "include",
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

/**
 * Fetches a pre-signed URL for downloading a file.
 *
 * @param {number} fileId - The unique identifier of the file.
 * @returns {Promise<string>} - A promise that resolves to the pre-signed URL.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const fetchPresignedUrl = async (fileId) => {
  const requestData = { fileId };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/files/get-presigned-url`,
    {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to fetch pre-signed URL");
  }

  return await response.text();
};
/**
 * Sends a request to the backend to create a new folder for a user.
 *
 * @param {string} folderName - The name of the folder to be created.
 * @param {number} userId - The ID of the user creating the folder.
 * @param {number|null} parentFolderId - (Optional) The ID of the parent folder, if applicable.
 * @returns {Promise<string>} A success message or an error message.
 */
export const createFolder = async (folderName, parentFolderId) => {
  // Prepare the payload to send in the request body
  const payload = {
    folderName,
    parentFolderId,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/files/create-folder`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    // Validation
    if (!response.ok) {
      throw new Error(`Failed to create folder: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Error creating folder:", error);
    return `Error: ${error.message}`;
  }
};

// Saving the file
export const saveFile = async (formBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/files/upload`,
      {
        method: "POST",
        credentials: "include",
        body: formBody,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to upload file", error);
      throw new Error(error);
    }
    return await response.text();
  } catch (error) {
    console.error("Error uploading file", error.message);
    throw new Error(error);
  }
};
