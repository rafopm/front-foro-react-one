import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function NavbarForo() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleCategoryFilter = (category) => {
    let encodedCategory = encodeURIComponent(category);
    if (category === "") {
      router.push("/forum");
    } else if (category === "sinrespuesta") {
      router.push("/forum/sinrespuesta");
    } else if (category === "resueltos") {
      router.push("/forum/resueltos");
    } else {
      router.push(`/forum/categoria/${encodedCategory}`);
    }
  };
  
  return (
    <nav>
      <div>
        <select onChange={(e) => handleCategoryFilter(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="Programación">Programación</option>
          <option value="Diseño gráfico">Diseño gráfico</option>
          <option value="Marketing digital">Marketing digital</option>
          <option value="Idiomas">Idiomas</option>
          <option value="Git y Github">Git y Github</option>
          {/* Agrega más opciones para otras categorías si es necesario */}
        </select>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/forum/[category]" as="/forum/todos">
              Todos
            </Link>
          </li>
          <li>
            <Link href="/forum/[category]" as="/forum/sinrespuesta">
              Sin respuesta
            </Link>
          </li>
          <li>
            <Link href="/forum/[category]" as="/forum/resueltos">
              Resueltos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
