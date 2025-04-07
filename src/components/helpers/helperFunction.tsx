import axios from "axios";

export const apiRequest = async (url: string, method: string, data?: any) => {
  try {
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