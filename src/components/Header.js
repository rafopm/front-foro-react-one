import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import NavbarForo from "./NavbarForo";
import Styles from "../styles/Header.module.css";
import Navbar from "./Navbar";
import Banner from "./Banner";

const Header = () => {
  const {token, userLogeado, logout,email } = useContext(AuthContext); // Ajusta el nombre de la variable a userLogeado
  const router = useRouter();

  console.log("token--",userLogeado.email,token)
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={Styles.header}>
      <div className={Styles.navcontainer}>
        <Navbar />
      </div>
      <div>
        <Banner />
      </div>
      <div>
        <NavbarForo />
      </div>
    </div>
  );
};

export default Header;
