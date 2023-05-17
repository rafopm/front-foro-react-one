import axios from "axios";

export const loginAPI = async (credentials) => {
  console.log(credentials);
    try {
      const response = await axios.post("http://localhost:8080/login", credentials);
      console.log("exito");
      return response.data.token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };