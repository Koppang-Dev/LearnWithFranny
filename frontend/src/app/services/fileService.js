import axios from "axios";

// Function to upload the file via API Call
export const uploadFile = async (file) => {
  // Adding the file to the form data
  const formData = FormData();
  formData.append("file", file);

  // Send the file via API Post request
  try {
    const response = await axios.post(
      "http://localhost:8080/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error Uploading File, Please Try Again");
  }
};
