import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchPosts } from '../../lib/api';
import Layout from '@/components/Layout';

const PostListPage = () => {
  const { user } = useContext(AuthContext);
  const [topicos, setTopicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await fetchPosts(user.token);

        if (Array.isArray(postData.content)) {
          setTopicos(postData.content);
          setTotalPages(postData.totalPages);
        } else {
          console.error('Los datos de postData.content no son un array válido:', postData.content);
        }
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
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PostListPage;
