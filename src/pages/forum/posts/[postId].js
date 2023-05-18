import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import { fetchPostById } from '@/lib/api';
import { AuthContext } from '@/context/AuthContext';

const PostDetailPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    
    const getPostData = async () => {
      try {
        const token = user.token;// Obtén el token de autenticación (Bearer token) desde tu contexto o cualquier otra fuente

        const postData = await fetchPostById(postId, token);
        setPost(postData);
      } catch (error) {
        console.error('Error al obtener los datos del post:', error);
      }
    };

    if (postId) {
      getPostData();
    }
  }, [postId]);

  return (
    <Layout>
      <div>
        {post ? (
          <div>
            <h1>{post.titulo}</h1>
            <p>{post.mensaje}</p>
            {/* Renderizar respuestas u otra información del post */}
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </Layout>
  );
};

export default PostDetailPage;
