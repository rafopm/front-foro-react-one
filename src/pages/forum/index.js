import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { fetchPosts, fetchTopicReplies } from "@/lib/api";
import Image from "next/image";
import Styles from "../../styles/Forum.module.css";
import NavbarForo from "@/components/NavbarForo";

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

  function getCategoryBorderStyle(categoria) {
    let borderColor = "";

    switch (categoria) {
      case "Diseño gráfico":
        borderColor = "#ff8c2a";
        break;
      case "Programación":
        borderColor = "#2a8cff";
        break;

      case "Marketing digital":
        borderColor = "#f800f8";
        break;

        case "Idiomas":
          borderColor = "#32fb00";
          break;
      // Agrega más casos para otras categorías si es necesario

      default:
        borderColor = "#000000"; // Estilo predeterminado si no coincide ninguna categoría
        break;
    }

    return `3px solid ${borderColor}`;
  }

  return (
    <Layout>
      <div className={Styles.container}>
        <div className={Styles.titleynewtopic}>
          <div className={Styles.title}>Tópicos más recientes</div>
        </div>
        <div>
          <NavbarForo />
        </div>
        <div>
          <ul className={Styles.topicoslist}>
            {topicos.map((topico) => (
              <li className={Styles.topico} key={topico.idtopico}>
                <div className={Styles.descripcion}>
                  <div className={Styles.iconcontainer}>
                    {topico.estatus === "RESUELTO" ? (
                      <div className={Styles.iconsolved}>
                        <img
                          src="../images/icon-solved.svg"
                          alt="Icono de topico resuelto"
                        />
                      </div>
                    ) : (
                      <div className={Styles.iconnotsolved}>
                        <img
                          src="../images/icon-not-solved.svg"
                          alt="Icono de topico resuelto"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div>
                      <Link
                        href={`/forum/posts/${topico.idtopico}`}
                        className={Styles.titletopico}
                      >
                        {topico.titulo}
                      </Link>
                    </div>
                    <div className={Styles.categoriascontainer}>
                      <ul className={Styles.categorylist}>
                        {topico.categorias.map((categoria, index) => (
                          <li
                            key={index}
                            style={{
                              borderLeft: getCategoryBorderStyle(categoria),
                            }}
                            className={Styles.iconcategory}
                          >
                            {categoria}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={Styles.autorcontainer}>
                  <div>
                    <div>{repliesCounts[topico.idtopico]}</div>
                    <div>
                      {repliesCounts[topico.idtopico] > 1 ? (
                        <span>Respuestas</span>
                      ) : (
                        <span>Respuesta</span>
                      )}
                    </div>
                  </div>
                  <div>Foto</div>
                  <div>
                    <div>Por {topico.usuarionombre}</div>
                    <div>{topico.fechacreacion}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
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
                style={{
                  fontWeight: currentPage === index ? "bold" : "normal",
                }}
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
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default PostListPage;
