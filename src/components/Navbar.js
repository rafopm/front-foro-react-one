import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Styles from "../styles/NavBar.module.css";
import Image from "next/image";
import { CategoryContext } from "@/context/CategoryContext";
import Nav from "./Nav";
import { NavContext } from "@/context/NavContext";

export default function Navbar() {
  const { userLogeado, logout } = useContext(AuthContext);
  const router = useRouter();
  const { setCategoryParam } = useContext(CategoryContext);

  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false); // Estado inicial actualizado

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

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleToggleNav = () => {
    setShowNav(!showNav); 
  };

  return (
    <NavContext.Provider value={{ setShowNav }}>
      <div className={Styles.container}>
        <div className={Styles.toggle} onClick={handleToggleNav}>
          <Image
            src="/images/toggle.svg"
            width={24}
            height={16}
            alt="Logo Alura"
          />
        </div>
        {showNav && (
          <div className={Styles.navWrapper}>
            <div className={Styles.navTransition}>
              <Nav />
            </div>
          </div>
        )}
        <div className={Styles.logoContainer}>
          <div>
            <Link href="/dashboard">
              <Image
                src="/images/logo-aluraespanhol.svg"
                width={80}
                height={54}
                alt="Logo Alura"
              />
            </Link>
          </div>
          <div className={Styles.separator}></div>
          <div>
            <Link href="/dashboard">
              <Image
                src="/images/logo-one.svg"
                width={85}
                height={30}
                alt="Logo ONE"
              />
            </Link>
          </div>
        </div>
        <nav className={Styles.menu}>
          <div className={Styles.menuItems}>
            <div className={Styles.menuItems}>
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
                  <span className={Styles.menuItems}>
                    {userLogeado.nombre.split(" ")[0].toUpperCase()}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={Styles.chevron}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
                {submenuOpen && (
                  <nav className={Styles.submenu}>
                    <span className={Styles.navarrow}></span>

                    <div className={Styles.submenuItem}>
                      <img
                        className={Styles.companyLogoImg}
                        src="https://cdn2.gnarususercontent.com.br/6/449886/cb18263e-8839-4fb9-8930-51d104f137d5.png"
                        alt="Logo da empresa - Oracle ONE - PERU 4"
                      />
                    </div>
                    <div className={Styles.submenuItemSalir}>
                      <Image
                        src="/images/icon-logout.svg"
                        width="26"
                        height="25"
                        alt="Icono salir"
                      />
                      <span
                        style={{ marginLeft: "15px" }}
                        onClick={handleLogout}
                      >
                        SALIR
                      </span>
                    </div>
                  </nav>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </NavContext.Provider>
  );
}
