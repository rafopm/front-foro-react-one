import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchPosts } from '../../lib/api';
import Layout from '@/components/Layout';

const PostList = () => {
  const { user } = useContext(AuthContext);
  const [topicos, setTopicos] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      console.log(user);
      try {
        const postData = await fetchPosts(user.token);
        
        if (Array.isArray(postData.content)) {
          setTopicos(postData.content);
        } else {
          console.error('Los datos de postData.content no son un array válido:', postData.content);
        }
        console.log(postData.content, "topicos");
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    fetchPostData();
  }, [user.token]);

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

