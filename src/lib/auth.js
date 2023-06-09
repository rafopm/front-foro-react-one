import axios from "axios";
const baseUrl = process.env.API_BASEURL; 

export const loginAPI = async (credentials) => {
  
  try {
    const response = await axios.post(`${baseUrl}login`, credentials);
    const token = response.data?.jwTtoken;
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserDataAPI = async (token, userEmail) => {

  try {
    const response = await axios.get(`${baseUrl}usuarios/email/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
