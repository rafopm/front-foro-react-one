import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { fetchPosts, fetchTopicReplies } from "@/lib/api";
import Image from "next/image";
import Styles from "../../styles/Forum.module.css"

const PostListPage = () => {
  const { user } = useContext(AuthContext);
  const [topicos, setTopicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const [repliesCounts, setRepliesCounts] = useState({});

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

  const iconSolved = {
    "min-width": "36px",
    "min-height": "36px",
    "border-radius": "50%",
    "padding": "9px 7px",
    "display": "block",
    "background-color" : "#00b9a0",
  };

  const iconNotSolved = {
    "min-width": "36px",
    "min-height": "36px",
    "border-radius": "50%",
    "padding": "9px 7px",
    "display": "block",
    
  };


  return (
    <Layout>
      <div>
        <table class="border-collapse border border-slate-800 table-auto">
          <thead></thead>
          <tbody class="border-collapse border border-slate-800">
            {topicos.map((topico) => (
              <tr
                class="border-collapse border border-slate-800"
                key={topico.idtopico}
              >
                <td>
                  {topico.estatus === "RESUELTO" ? (
                    <>
                      <Image
                        src="../images/icon-solved.svg"
                        width={36}
                        height={36}
                        alt="Resuelto"
                        style={iconSolved}
                      
                      />
                    </>
                  ) : (
                    <>
                      <span >
                        <Image
                          src="../images/icon-not-solved.svg"
                          width={36}
                          height={36}
                          alt="No resuelto"
                          style={iconNotSolved}
                        />
                      </span>
                    </>
                  )}
                </td>

                <td>
                  <Link href={`/forum/posts/${topico.idtopico}`}>
                    {topico.titulo}
                  </Link>
                  <span> {topico.categorias.join(", ")}</span>
                </td>
                <td>
                  <div>{repliesCounts[topico.idtopico]}</div>
                  <div>
                    {repliesCounts[topico.idtopico] > 1 ? (
                      <span>Respuestas</span>
                    ) : (
                      <span>Respuesta</span>
                    )}
                  </div>
                </td>
                <td>
                  <div>Por {topico.usuarionombre}</div>
                  <div>{topico.fechacreacion}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
        <div></div>
      </div>
    </Layout>
  );
};

export default PostListPage;
