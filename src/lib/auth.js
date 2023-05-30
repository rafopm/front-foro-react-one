import axios from "axios";
const baseUrl = process.env.API_BASEURL; 
console.log("baseUrl auth",baseUrl)
export const loginAPI = async (credentials) => {
  console.log("CREDENCIALES",credentials);
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
  console.log("user_api",userEmail, token);
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
