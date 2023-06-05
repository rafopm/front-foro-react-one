import { AuthContext } from "@/context/AuthContext";
import { CategoryContext } from "@/context/CategoryContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Styles from "../styles/Nav.module.css";

const Nav = () => {
  const { userLogeado, logout } = useContext(AuthContext);
  const router = useRouter();
  const { setCategoryParam } = useContext(CategoryContext);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [hideComponent, setHideComponent] = useState(false); // Estado para controlar la visibilidad del componente

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleForumClick = () => {
    setCategoryParam("todos");
  };

  const handleUserClick = () => {
    toggleSubmenu();
  };

  const toggleSubmenu = () => {
    setSubmenuOpen((prevState) => !prevState);
  };

  const handleHide = () => {
    setHideComponent(true); // Oculta el componente cuando se hace clic en handleHide
  };

  if (hideComponent) {
    return null; // Si hideComponent es true, retorna null para no renderizar el componente
  }

  return (
    <div className={Styles.verticalContainer}>
      <div className={Styles.toggle} onClick={handleHide}>
        <Image
          src="/images/toggle.svg"
          width={24}
          height={16}
          alt="Logo Alura"
          style={{"position":"relative","filter":"brightness(100)", "top":"25px","left":"20px"}}
        />
      </div>
      <div className={Styles.menuItems}>
        <div>
          <Link href="/forum">
            <span className={Styles.foroItem} onClick={handleForumClick}>
              FORO
            </span>
          </Link>
        </div>

        {userLogeado && (
          <div className={Styles.userContainer}>
            <div className={Styles.user} onClick={handleUserClick}>
              <img
                className={Styles.avatar}
                src={`/images/photos/${userLogeado.idusuario}.jpeg`}
                alt="Foto del usuario"
              />
              <span>
                {userLogeado.nombre.split(" ")[0].toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
