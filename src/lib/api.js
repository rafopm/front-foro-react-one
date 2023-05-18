import axios from "axios";

export const fetchPosts = async (token) => {
  const bearer_token = `Bearer ${token}`;
  console.log("token", bearer_token);
  try {
    const response = await axios.get("http://localhost:8080/topicos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("DATA QUE QUIERO", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPostById = async (postId) => {
  try {
    const response = await axios.get(`http://localhost:8080/topicos/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
