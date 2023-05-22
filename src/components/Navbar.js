import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Styles from "../styles/NavBar.module.css";
import Image from "next/image";

export default function Navbar() {
  const { user, logout, userLogeado } = useContext(AuthContext);
  const router = useRouter();
  /*
  useEffect(() => {
    if (userLogeado) {
    }
  }, [userLogeado]);
*/
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.logoContainer}>
        <div>
          <Link href="/">
            <Image
              src="../images/logo-aluraespanhol.svg"
              width={80}
              height={50}
              alt="Resuelto"
            />
          </Link>
        </div>
        <div className={Styles.separator}></div>
        <div>
          <Link href="/">
            <Image
              src={"../images/logo-one.svg"}
              width={102}
              height={36}
              alt="Resuelto"
            />
          </Link>
        </div>
      </div>
      <nav className={Styles.menu}>
        <ul className={Styles.menuItems}>
          {user.token ? (
            <>
              <li>
                <Link href="/forum">FORO</Link>
              </li>

              {userLogeado && (
                <>
                  <li>
                    <img
                      className={Styles.avatar}
                      src={`/images/photos/${userLogeado.idusuario}.jpeg`}
                      alt="Foto del usuario"
                    />
                  </li>
                  <li>{userLogeado.nombre.split(" ")[0].toUpperCase()}</li>
                </>
              )}

              <li>
                <button onClick={handleLogout}>SALIR</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
