import axios from "axios";
export const fetchPosts = async (token, pageNumber) => {
  try {
    const response = await axios.get(`http://localhost:8080/topicos?page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts = response.data.content.map(async (post) => {
      const categoryResponse = await axios.get(`http://localhost:8080/topicocategoria/topico/${post.idtopico}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const categories = categoryResponse.data.map((category) => category.categorianombre);

      return {
        ...post,
        categorias: categories,
      };
    });

    const resolvedPosts = await Promise.all(posts);

    return {
      ...response.data,
      content: resolvedPosts,
    };
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
