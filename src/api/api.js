import axios from 'axios';

const BASE_URL = 'http://ejemplo.com/api'; // Reemplaza con la URL de tu API

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      const { token } = response.data;
      // Guardar el token en el almacenamiento local (ejemplo: localStorage)
      localStorage.setItem('token', token);
      // Devolver el token
      return token;
    } catch (error) {
      throw new Error('Error de inicio de sesión');
    }
  };
  
  export const getPosts = async () => {
    try {
      const response = await api.get('/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los posts');
    }
  };