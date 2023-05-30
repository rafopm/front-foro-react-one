import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from "../styles/NavBar.module.css";
import Image from "next/image";
import { CategoryContext } from "@/context/CategoryContext";

export default function Navbar() {
  const { userLogeado, logout } = useContext(AuthContext);
  const router = useRouter();
  const { setCategoryParam } = useContext(CategoryContext);
  const [submenuOpen, setSubmenuOpen] = useState(false); // Estado para controlar si el submenu está abierto o cerrado

  console.log("userlogeado", userLogeado);
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleForumClick = () => {
    setCategoryParam("todos");
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen); // Cambiar el estado del submenu al hacer clic en el nombre del usuario
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.logoContainer}>
        <div>
          <Link href="/dashboard">
            <Image
              src="../images/logo-aluraespanhol.svg"
              width={80}
              height={50}
              alt="Logo Alura"
            />
          </Link>
        </div>
        <div className={Styles.separator}></div>
        <div>
          <Link href="/dashboard">
            <Image
              src={"../images/logo-one.svg"}
              width={102}
              height={36}
              alt="Logo ONE"
            />
          </Link>
        </div>
      </div>
      <nav className={Styles.menu}>
        <ul className={Styles.menuItems}>
          {userLogeado ? (
            <>
              <li>
                <Link href="/forum">
                  <span onClick={handleForumClick}>FORO</span>
                </Link>
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
                  <li className={submenuOpen ? Styles.open : ""}>
                    <span onClick={toggleSubmenu}>
                      {userLogeado.nombre.split(" ")[0].toUpperCase()}
                    </span>
                    <ul className={Styles.submenu}>
                      <li>
                        <span onClick={handleLogout}></span>{" "}
                        {/* Elimina el contenido dentro del span */}
                      </li>
                    </ul>
                  </li>
                </>
              )}
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
