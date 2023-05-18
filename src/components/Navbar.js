import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          {user.token ? (
            <button onClick={handleLogout}>Cerrar sesión</button>
          ) : (
            <Link href="/login">Iniciar sesión</Link>
          )}
        </li>
        <li>
          <Link href="/forum">Foro</Link>
        </li>
      </ul>
    </nav>
  );
}
