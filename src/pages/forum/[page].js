import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { fetchPosts, fetchTopicReplies } from "@/lib/api";

const PostListPage = () => {
  const { user } = useContext(AuthContext);
  const [topicos, setTopicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [repliesCounts, setRepliesCounts] = useState({});
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
      setCurrentPage(pageQueryParam);
      fetchPostData(pageQueryParam);
    } else {
      router.push("/forum?page=1"); // Redireccionar a la página 1 si no hay parámetro de página válido en la URL
    }
  }, [user.token, router.query.page]);

  const handlePageChange = (pageNumber) => {
    router.push(`/forum?page=${pageNumber}`);
  };

  const getTopicRepliesCount = async (topicId) => {
    try {
      const replies = await fetchTopicReplies(user.token, topicId);
      return replies.length;
    } catch (error) {
      console.error("Error al obtener las respuestas:", error);
      return 0;
    }
  };

  const fetchRepliesCounts = async () => {
    const counts = {};

    for (const topico of topicos) {
      const count = await getTopicRepliesCount(topico.idtopico);
      counts[topico.idtopico] = count;
    }

    setRepliesCounts(counts);
  };

  useEffect(() => {
    fetchRepliesCounts();
  }, [topicos, user.token]);

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
              <span> {topico.usuarionombre}</span>
              <span> {topico.fechacreacion}</span>
              <span> Respuestas: {repliesCounts[topico.idtopico]}</span>
            </li>
          ))}
        </ul>
        <div>
          <button
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              style={{ fontWeight: currentPage === index ? "bold" : "normal" }}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
        <div>
          <table class="table-auto">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
              </tr>
              <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
              </tr>
              <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default PostListPage;
