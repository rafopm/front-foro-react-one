import axios from "axios";

const baseUrl = process.env.API_BASEURL; 
console.log("baseUrl",baseUrl)

export const fetchPosts = async (token, pageNumber, urlParam = "") => {
  console.log("peticion: ",token," ", pageNumber," ", urlParam)
  try {
    let url = `${baseUrl}topicos`;
    if (urlParam) {
      url += `/${urlParam}`;
    }
    url += `?page=${pageNumber}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts = response.data.content.map(async (post) => {
      const categoryResponse = await axios.get(
        `${baseUrl}topicocategoria/topico/${post.idtopico}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const categories = categoryResponse.data.map(
        (category) => category.categorianombre
      );

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
    throw new Error("Error al obtener los posts");
  }
};

export const fetchPostById = async (postId, token) => {
  try {
    const response = await axios.get(
      `${baseUrl}topicos/${postId}`, // Utilizar la URL base en la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchTopicReplies = async (token, topicId) => {
  try {
    const respuestas = await axios.get(
      `${baseUrl}respuestas/topico/${topicId}`, // Utilizar la URL base en la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return respuestas.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCategorias = async (token) => {
  try {
    const response = await axios.get(
      `${baseUrl}categorias`, // Utilizar la URL base en la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchBuscarTopicosTitulo = async (token,palabras) => {
  try {
    const response = await axios.get(
      `${baseUrl}topicos/buscar/${palabras}`, // Utilizar la URL base en la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};