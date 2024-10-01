import axios from "axios";


export const registerUser = async (user) => {
  try {
    console.log(user);
    const response = await axios.post(
      "http://pdf-node-seven.vercel.app/api/users/register",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Log the error
    if (error.response) {
      // Server responded with a status code other than 2xx
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something else caused an error
      console.error("Error message:", error.message);
    }
    // Optionally rethrow the error if you want to handle it elsewhere
    throw error;
  }
};
export const loginUser = async (user) => {
  const response = await axios.post(
    "http://pdf-node-seven.vercel.app/api/users/login",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};


export const fetchPDF = async (filename) => {
  try {
      // Make a GET request to fetch the PDF file
      const response = await axios.get(`http://pdf-node-seven.vercel.app/api/pdfDetails/files/${filename}`, {
          responseType: 'blob', // Important: Set the response type to 'blob'
      });

      return response.data;
     

  } catch (error) {
      console.error("Error fetching PDF: ", error);
      Alert.alert("Error", "Could not fetch the PDF.");
  }
};