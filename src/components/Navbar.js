import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Styles from "../styles/NavBar.module.css";

export default function Navbar() {
  const { user, logout, userLogeado } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (userLogeado) {

    }
  }, [userLogeado]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className={Styles.menu}>
      <div>Logo</div>

      <ul className={Styles.menuItems}>
        <li>
          {user.token ? (
            <>
              <li>
                <Link href="/">FORO</Link>
              </li>
              <li>
                <p>Nombre: {userLogeado ? userLogeado.nombre : ""}</p>
              </li>
              <button onClick={handleLogout}>SALIR</button>
            </>
          ) : (
            <Link href="/login">Iniciar sesión</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
