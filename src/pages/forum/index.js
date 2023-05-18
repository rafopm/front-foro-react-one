import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { fetchPosts } from "@/lib/api";

const PostListPage = () => {
  const { user } = useContext(AuthContext);
  const [topicos, setTopicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const pageQueryParam = Number(router.query.page); // Obtener el número de página de la query param

        // Si el valor de pageQueryParam es un número válido y mayor o igual a 0, establecerlo como currentPage
        if (!isNaN(pageQueryParam) && pageQueryParam >= 0) {
          setCurrentPage(pageQueryParam);
        } else {
          setCurrentPage(0); // Si el valor de pageQueryParam no es válido, establecer currentPage como 0
        }

        const postData = await fetchPosts(user.token, currentPage);

        if (Array.isArray(postData.content)) {
          setTopicos(postData.content);
          setTotalPages(postData.totalPages);
        } else {
          console.error(
            "Los datos de postData.content no son un array válido:",
            postData.content
          );
        }
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchPostData();
  }, [user.token, currentPage, router.query.page]);

  const handlePageChange = (pageNumber) => {
    router.push(`/forum?page=${pageNumber}`); // Actualizar la URL con la página seleccionada
  };

  return (
    <Layout>
      <div>
        <h1>Listado de Posts</h1>
        <ul>
          {topicos.map((topico) => (
            <li key={topico.id_topico}>
              <Link href={`/forum/posts/${topico.id_topico}`}>
                {topico.titulo}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PostListPage;
