import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getPosts } from '../../api/api';
import Layout from '@/components/Layout';

const PostList = () => {
  const { token } = useContext(AuthContext);
  const [topicos, setTopicos] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await getPosts(token);
        setTopicos(postData);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <Layout>
    <div>
      <h1>Listado de Posts</h1>
      <ul>
        {topicos.map((topico) => (
          <li key={topico.id_topico}>{topico.titulo}</li>
        ))}
      </ul>
    </div>
    </Layout>
  );
};

export default PostList;