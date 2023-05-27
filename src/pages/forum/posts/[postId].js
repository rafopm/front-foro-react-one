import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import { fetchPostById, fetchTopicReplies } from '@/lib/api';
import { AuthContext } from '@/context/AuthContext';

const PostDetailPage = () => {
  const { userLogeado,token } = useContext(AuthContext);
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      try {
        //const token = userLogeado.token;
        const postData = await fetchPostById(postId, token);
        setPost(postData);
      } catch (error) {
        console.error('Error al obtener los datos del post:', error);
      }

      try {
        const postData = await fetchTopicReplies(token, postId );
        setRespuestas(postData);
      } catch (error) {
        console.error('Error al obtener las respuestas al post:', error);
      }
    };

    if (postId) {
      getPostData();
    }
  }, [postId, userLogeado]);

  return (
    <Layout>
    <div>
      {post ? (
        <div>
          <h1>{post.titulo}</h1>
          <p>{post.mensaje}</p>
          <p>{post.fechacreacion}</p>
          <h2>Respuestas:</h2>
          {respuestas.map((respuesta) => (
            <div key={respuesta.idrespuesta}>
              <p>{respuesta.mensaje}</p>
              <p>{respuesta.usuarionombre}</p>
              <p>{respuesta.fechacreacion}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  </Layout>
  );
};

export default PostDetailPage;
