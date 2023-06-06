import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CategoryContext } from "@/context/CategoryContext";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { fetchPosts, fetchTopicReplies } from "@/lib/api";
import Styles from "../../styles/Forum.module.css";
import { calculateTimeAgo } from "../../utils/calcularTiempo";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import UserPhoto from "@/components/forum/UserPhoto";
import PostIsSolved from "@/components/forum/PostIsSolved";
import EstilarCategorias from "@/components/forum/EstilarCategorias";
import Spinner from "@/components/Spinner";

const PostListPage = () => {
  const { token } = useContext(AuthContext);
  const { categoryParam, setCategoryParam } = useContext(CategoryContext);
  const router = useRouter();

  const [topicos, setTopicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [repliesCounts, setRepliesCounts] = useState({});
  const [topicosConTiempoAgo, setTopicosConTiempoAgo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPostData = async (pageNumber) => {
      try {
        const postData = await fetchPosts(
          token,
          pageNumber,
          categoryParam || "todos"
        );
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

    const fetchRepliesCounts = async () => {
      const updatedCounts = {};

      for (const topico of topicos) {
        const count = await getTopicRepliesCount(topico.idtopico);
        updatedCounts[topico.idtopico] = count;
      }

      setRepliesCounts(updatedCounts);
    };

    const fetchPostDataAndRepliesCounts = async (pageNumber) => {
      setIsLoading(true);

      try {
        await fetchPostData(pageNumber);
        await fetchRepliesCounts();
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }

      setIsLoading(false);
    };

    const pageQueryParam = Number(router.query.page);

    if (!isNaN(pageQueryParam) && pageQueryParam >= 1) {
      setCurrentPage(pageQueryParam - 1);
      fetchPostDataAndRepliesCounts(pageQueryParam - 1);
    } else {
      router.push("/forum?page=1");
    }

    fetchPostDataAndRepliesCounts(pageQueryParam - 1);
  }, [token, categoryParam, router.query.page]);

  useEffect(() => {
    const updateTopicosConTiempoAgo = async () => {
      const updatedTopicos = [];

      for (const topico of topicos) {
        const formattedTimeAgo = calculateTimeAgo(topico.fechacreacion);
        const count = await getTopicRepliesCount(topico.idtopico);

        updatedTopicos.push({
          ...topico,
          tiempoAgo: formattedTimeAgo,
          numRespuestas: count,
        });
      }

      setTopicosConTiempoAgo(updatedTopicos);
    };

    updateTopicosConTiempoAgo();
  }, [topicos]);

  const handlePageChange = (pageNumber) => {
    const nextPage = pageNumber + 1;
    router.push(`/forum?page=${nextPage}`);
  };

  const getTopicRepliesCount = async (topicId) => {
    try {
      const replies = await fetchTopicReplies(token, topicId);
      return replies.length;
    } catch (error) {
      console.error("Error al obtener las respuestas:", error);
      return 0;
    }
  };

  const arrowIconStyle = {
    fontSize: "36px",
    verticalAlign: "middle",
  };

  return (
    <Layout>
      <div>
        {isLoading ? (
          <div className="animation">
            <Spinner />
          </div>
        ) : ( 
          <div className={Styles.container}>
            <div></div>
            <div>
              <ul className={Styles.topicoslist}>
                {topicosConTiempoAgo.map((topico) => (
                  <li className={Styles.topico} key={topico.idtopico}>
                    <div className={Styles.descripcion}>
                      <div>
                        <PostIsSolved status={topico.estatus} />
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
                        <div>
                          <EstilarCategorias categorymap={topico.categorias} />
                        </div>
                      </div>
                    </div>
                    <div className={Styles.autorcontainer}>
                      <div className={Styles.cantrespuestas}>
                        <span className={Styles.numrespuesta}>
                          {topico.numRespuestas}
                        </span>
                        <span className={Styles.respuesta}>
                          {topico.numRespuestas > 1 ||
                          topico.numRespuestas === 0 ? (
                            <span>respuestas</span>
                          ) : (
                            <span>respuesta</span>
                          )}
                        </span>
                      </div>
                      <div className={Styles.autorcontainer}>
                        <div>
                          <UserPhoto
                            userId={topico.idusuario}
                            userName={topico.usuarionombre}
                          />
                        </div>

                        <div className={Styles.nombreytiempo}>
                          <span className={Styles.nombreautor}>
                            por{" "}
                            <strong>
                              {topico.usuarionombre.split(" ")[0]}
                            </strong>
                          </span>
                          <div className={Styles.tiempo}>
                            <span>{topico.tiempoAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={Styles.paginacioncontainer}>
              <div>
                {totalPages > 0 && (
                  <div className={Styles.pagination}>
                    <nav>
                      {" "}
                      <span
                        className={
                          currentPage === 0
                            ? Styles.pageizquierdaactivo
                            : Styles.pageizquierdainactivo
                        }
                        onClick={() => {
                          if (currentPage > 0) {
                            handlePageChange(currentPage - 1);
                          }
                        }}
                      >
                        <IconContext.Provider value={{ style: arrowIconStyle }}>
                          <RiArrowLeftSLine />
                        </IconContext.Provider>
                        Anterior
                      </span>
                    </nav>
                    <nav className={Styles.pagelinks}>
                      {" "}
                      {Array.from(Array(totalPages).keys()).map(
                        (pageNumber) => (
                          <span
                            key={pageNumber}
                            className={
                              currentPage === pageNumber
                                ? Styles.linkseleccionado
                                : Styles.link
                            }
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber + 1}
                          </span>
                        )
                      )}
                    </nav>
                    <nav>
                      <span
                        className={
                          currentPage === totalPages - 1
                            ? Styles.pagederechaactivo
                            : Styles.pagederechainactivo
                        }
                        onClick={() => {
                          if (currentPage < totalPages - 1) {
                            handlePageChange(currentPage + 1);
                          }
                        }}
                      >
                        Siguiente
                        <IconContext.Provider value={{ style: arrowIconStyle }}>
                          <RiArrowRightSLine />
                        </IconContext.Provider>
                      </span>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostListPage;
