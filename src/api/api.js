import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL de tu API

const api = axios.create({
  baseURL: BASE_URL,
});
console.log(BASE_URL);
api.interceptors.request.use((config) => {
  const { token } = useContext(AuthContext);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (email, contrasena) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: email,
      contrasena: contrasena,
    });

    const { token } = response.data;
    // Guardar el token en el almacenamiento local (ejemplo: localStorage)
    localStorage.setItem('token', token);
    // Devolver el token
    console.log("exito", token);
    return token;
  } catch (error) {
    console.log("error", error);
    throw new Error('Error de inicio de sesión');
  }
};
  
  export const getPosts = async () => {
    try {
      const response = await api.get('/topicos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los posts');
    }
  };