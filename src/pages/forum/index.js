import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { fetchPosts, fetchTopicReplies } from "@/lib/api";
import Image from "next/image";
import Styles from "../../styles/Forum.module.css";
import NavbarForo from "@/components/NavbarForo";
import { calculateTimeAgo } from "../../utils/calcularTiempo";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IconContext } from "react-icons";

const PostListPage = () => {
  const { user } = useContext(AuthContext);
  const [topicos, setTopicos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const [repliesCounts, setRepliesCounts] = useState({});
  const [userPhotos, setUserPhotos] = useState({});

  const [topicosConTiempoAgo, setTopicosConTiempoAgo] = useState([]);

  const fetchUserPhoto = async (userId, userName) => {
    const photoPath = `/images/photos/${userId}.jpeg`;
    const photoExists = await checkPhotoExists(photoPath);

    if (photoExists) {
      setUserPhotos((prevUserPhotos) => ({
        ...prevUserPhotos,
        [userId]: { photo: photoPath, initials: "" },
      }));
    } else {
      const initials = userName.substring(0, 1).toUpperCase();
      setUserPhotos((prevUserPhotos) => ({
        ...prevUserPhotos,
        [userId]: { photo: "", initials },
      }));
    }
  };

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

    const fetchRepliesCounts = async () => {
      const updatedCounts = {};

      for (const topico of topicos) {
        const count = await getTopicRepliesCount(topico.idtopico);
        updatedCounts[topico.idtopico] = count;
      }

      setRepliesCounts(updatedCounts);
    };

    const fetchPostDataAndRepliesCounts = async (pageNumber) => {
      await fetchPostData(pageNumber);
      await fetchRepliesCounts();
    };

    const pageQueryParam = Number(router.query.page);

    if (!isNaN(pageQueryParam) && pageQueryParam >= 1) {
      setCurrentPage(pageQueryParam - 1);
      fetchPostDataAndRepliesCounts(pageQueryParam - 1);
    } else {
      router.push("/forum?page=1");
    }
  }, [user.token, router.query.page]);

  useEffect(() => {
    topicos.forEach(async (topico) => {
      fetchUserPhoto(topico.idusuario, topico.usuarionombre);
      const formattedTimeAgo = calculateTimeAgo(topico.fechacreacion);
      topico.tiempoAgo = formattedTimeAgo;
      topico.numRespuestas = await getTopicRepliesCount(topico.idtopico);
    });

    setTopicosConTiempoAgo([...topicos]);
  }, [topicos]);

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

  const checkPhotoExists = async (photoPath) => {
    try {
      const response = await fetch(photoPath);
      return response.ok;
    } catch (error) {
      console.error("Error al verificar la existencia de la foto:", error);
      return false;
    }
  };

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

  const getGravatarImage = (initial) => {
    const gravatarURL = `https://www.gravatar.com/avatar/${initial.toLowerCase()}.png?r=PG&size=60x60&date=2023-05-22&d=https%3A%2F%2Fapp.aluracursos.com%2Fassets%2Fimages%2Fforum%2Favatar_${initial.toLowerCase()}.png`;

    return gravatarURL;
  };

  const arrowIconStyle = {

    fontSize: '36px',
    verticalAlign: 'middle',
  };

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
            {topicosConTiempoAgo.map((topico) => (
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
                  <div className={Styles.cantrespuestas}>
                    <span className={Styles.numrespuesta}>
                      {topico.numRespuestas}
                    </span>
                    <span className={Styles.respuesta}>
                      {topico.numRespuestas > 1 || topico.numRespuestas === 0 ? (
                        <span>respuestas</span>
                      ) : (
                        <span>respuesta</span>
                      )}
                    </span>
                  </div>
                  <div className={Styles.autorcontainer}>
                    {userPhotos[topico.idusuario] && (
                      <div className={Styles.imagenoletra}>
                        {userPhotos[topico.idusuario].photo ? (
                          <img
                            src={userPhotos[topico.idusuario].photo}
                            alt={`Foto de ${topico.usuarionombre}`}
                            className={Styles.imagen}
                          />
                        ) : (
                          <img
                            src={getGravatarImage(
                              userPhotos[topico.idusuario].initials
                            )}
                            alt={`Foto de ${topico.usuarionombre}`}
                            className={Styles.imagen}
                          />
                        )}
                      </div>
                    )}
                    <div className={Styles.nombreytiempo}>
                      <span className={Styles.nombreautor}>
                        por{" "}
                        <strong>{topico.usuarionombre.split(" ")[0]}</strong>
                      </span>
                      <div>
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
                  {Array.from(Array(totalPages).keys()).map((pageNumber) => (
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
                  ))}
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
    </Layout>
  );
};

export default PostListPage;
