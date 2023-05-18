import axios from "axios";

export const fetchPosts = async (token, pageNumber) => {
  try {
    const response = await axios.get(`http://localhost:8080/topicos?page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los posts');
  }
};

export const fetchPostById = async (postId, token) => {
  console.log("aqui");
  try {
    const response = await axios.get(`http://localhost:8080/topicos/${postId}`, {
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
