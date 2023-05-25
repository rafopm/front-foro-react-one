import axios from "axios";

export const loginAPI = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:8080/login", credentials);
    const token = response.data?.jwTtoken; // Obtener el token del objeto de respuesta
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserDataAPI = async (token,userEmail) => {
  try {
    const response = await axios.get(`http://localhost:8080/usuarios/email/${userEmail}`, {
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