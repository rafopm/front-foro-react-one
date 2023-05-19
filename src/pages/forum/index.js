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
    const fetchPostData = async (pageNumber) => {
      try {
        const postData = await fetchPosts(user.token, pageNumber);

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

    const pageQueryParam = Number(router.query.page);

    if (!isNaN(pageQueryParam) && pageQueryParam >= 1) {
      setCurrentPage(pageQueryParam - 1); // Restar 1 al número de página para que coincida con el índice del arreglo
      fetchPostData(pageQueryParam - 1);
    } else {
      router.push("/forum?page=1"); // Redireccionar a la página 1 si no hay parámetro de página válido en la URL
    }
  }, [user.token, router.query.page]);

  const handlePageChange = (pageNumber) => {
    const nextPage = pageNumber + 1; // Sumar 1 al número de página para que coincida con el parámetro de la URL
    router.push(`/forum?page=${nextPage}`);
  };

  return (
    <Layout>
      <div>
        <h1>Listado de Posts</h1>
        <ul>
          {topicos.map((topico) => (
            <li key={topico.idtopico}>
              <Link href={`/forum/posts/${topico.idtopico}`}>
                {topico.titulo}
              </Link>
              <span> Categorías: {topico.categorias.join(", ")}</span>
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
