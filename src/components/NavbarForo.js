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
    router.push(`/forum/categoria/${encodeURIComponent(category)}`);
  };

  return (
    <nav>
      <div>
        <select onChange={(e) => handleCategoryFilter(e.target.value)}>
          <option value="">Por categoría</option>
          <option value="Diseño gráfico">Diseño gráfico</option>
          <option value="Programación">Programación</option>
          <option value="Marketing digital">Marketing digital</option>
          <option value="Idiomas">Idiomas</option>
          {/* Agrega más opciones para otras categorías si es necesario */}
        </select>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/forum">Todos</Link>
          </li>
          <li>
            <Link href="/forum?listType=sin-respuesta">Sin respuesta</Link>
          </li>
          <li>
            <Link href="/forum?listType=resueltos">Resueltos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
