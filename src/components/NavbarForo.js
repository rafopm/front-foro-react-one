import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CategoryContext } from "@/context/CategoryContext";
import { fetchCategorias } from "@/lib/api";
import Styles from "../styles/NavBarForo.module.css";

const NavbarForo = () => {
  const { token, userLogeado, logout } = useContext(AuthContext);
  const { categoryParam, setCategoryParam } = useContext(CategoryContext);
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setCategoryParam(`buscar/${searchTerm}`);
    setSearchTerm("");
  };

  const handleCategoryChange = (categoria) => {
    setCategoryParam(categoria);
  };

  useEffect(() => {
    if (router.pathname === "/forum") {
      fetchCategoryData();
    }
  }, [router.pathname]);

  const fetchCategoryData = async () => {
    try {
      const postData = await fetchCategorias(token);
      setCategorias(postData.content);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  if (router.pathname !== "/forum") {
    return null;
  }

  const handleOptionChange = (event) => {
    setCategoryParam(event.target.value);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.titleynewtopic}>
        <div className={Styles.title}>Tópicos más recientes</div>
      </div>
      <div className={Styles.categoriasyrestricciones}>
        <nav className={Styles.navContainer}>
          <div className={Styles.categorias}>
            <select
              className={Styles.selectfilter}
              value={categoryParam}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="todos">Todos las categorías</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idcategoria}
                  value={`categoria/${categoria.idcategoria}`}
                >
                  {categoria.nombre}
                </option>
              ))}
            </select>

            <div className={Styles.alternativeSelect}>
              <div className={Styles.radioContainer}>
                <label
                  className={categoryParam === "todos" ? Styles.selected : ""}
                >
                  <input
                    type="radio"
                    value="todos"
                    checked={categoryParam === "todos"}
                    onChange={handleOptionChange}
                  />
                  <span>Todos</span>
                </label>
              </div>
              <div className={Styles.radioContainer}>
                <label
                  className={
                    categoryParam === "sinrespuesta" ? Styles.selected : ""
                  }
                >
                  <input
                    type="radio"
                    value="sinrespuesta"
                    checked={categoryParam === "sinrespuesta"}
                    onChange={handleOptionChange}
                  />
                  <span>Sin respuesta</span>
                </label>
              </div>
              <div className={Styles.radioContainer}>
                <label
                  className={
                    categoryParam === "resueltos" ? Styles.selected : ""
                  }
                >
                  <input
                    type="radio"
                    value="resueltos"
                    checked={categoryParam === "resueltos"}
                    onChange={handleOptionChange}
                  />
                  <span>Resueltos</span>
                </label>
              </div>
            </div>
          </div>
          <div className={Styles.buscarArea}>
            <form onSubmit={handleSearch} className={Styles.searchForm}>
              <div className={Styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Busque por asunto"
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={Styles.searchInput}
                />
                <button type="submit" className={Styles.searchButton}>
                  <img
                    src="/images/forum-search.svg"
                    alt="Buscar"
                    className={Styles.searchIcon}
                  />
                </button>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarForo;
