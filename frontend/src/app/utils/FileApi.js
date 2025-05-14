/**
 * Fetches a list of documents for the specified user.
 *
 * @param {string} userId - The unique identifier of the user whose documents need to be fetched.
 * @returns {Promise<Object[]>} - A promise that resolves to the list of documents in JSON format.
 * @throws {Error} - Throws an error if the fetch operation fails or the response is not successful.
 */
export const fetchDocuments = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/files`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    // Validation
    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      throw new Error("Failed to fetch documents");
    }

    return response.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
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
    credentials: "include",
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
export const deleteFolder = async (folderId) => {
  // Make an HTTP DELETE request to delete the specified folder for the user
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/folder/delete/${folderId}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/folder/rename`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/move`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/download`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/get-presigned-url`,
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
export const createFolder = async (folderName, userId, parentFolderId) => {
  // Prepare the payload to send in the request body
  const payload = {
    folderName,
    userId,
    parentFolderId,
  };

  try {
    console.log("Creating Folders", payload);
    // Send a POST request to the backend to create a new folder
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/create-folder`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization header can be added if authentication is required
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload), // Convert payload to JSON string
      }
    );

    // Check if the response is successful (status code 2xx)
    if (!response.ok) {
      throw new Error(`Failed to create folder: ${response.statusText}`);
    }

    // Return the response body as a text or JSON message
    return await response.text(); // Use `await response.json();` if the backend returns JSON
  } catch (error) {
    console.error("Error creating folder:", error);
    return `Error: ${error.message}`;
  }
};

// Saving the file
export const saveFile = async (formBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/upload`,
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
    console.error("Error uploading file");
    return `Error: ${error.message}`;
  }
};
