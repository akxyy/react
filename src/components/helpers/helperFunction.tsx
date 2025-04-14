import axios from "axios";

export const apiRequest = async (path: string, method: string, data?: any) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}${path}`;
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};