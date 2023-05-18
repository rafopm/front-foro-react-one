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
