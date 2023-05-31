import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CategoryContext } from "@/context/CategoryContext";
import { fetchCategorias } from "@/lib/api";
import Styles from "../styles/NavBarForo.module.css";

const NavbarForo = () => {
  const { token, userLogeado, logout } = useContext(AuthContext); // Ajusta el nombre de la variable a userLogeado
  const { categoryParam, setCategoryParam } = useContext(CategoryContext);
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    //router.push(`/forum/buscar/${searchTerm}`);
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
      const postData = await fetchCategorias(token); // Utiliza userLogeado.token en lugar de user.token
      setCategorias(postData.content);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  if (router.pathname !== "/forum") {
    return null; // No mostrar el componente si la ruta no es "/forum"
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.titleynewtopic}>
        <div className={Styles.title}>Tópicos más recientes</div>
      </div>
      <div>
        <nav>
          <select
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

          <span
            onClick={() => handleCategoryChange("todos")}
            className={categoryParam === "todos" ? "active" : ""}
          >
            Todos
          </span>

          <span
            onClick={() => handleCategoryChange("resueltos")}
            className={categoryParam === "resueltos" ? "active" : ""}
          >
            Resueltos
          </span>

          <span
            onClick={() => handleCategoryChange("sinrespuesta")}
            className={categoryParam === "sinrespuesta" ? "active" : ""}
          >
            Sin Respuesta
          </span>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
        </nav>
      </div>
    </div>
  );
};

export default NavbarForo;
