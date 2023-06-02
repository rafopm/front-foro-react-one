import Navbar from "./Navbar";
import NavbarForo from "./NavbarForo";
import Footer from "./Footer";
import Header from "./Header";
import Banner from "./Banner";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import Styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  const {token, logout } = useContext(AuthContext);
    const router = useRouter();
  
    useEffect(() => {
      // Verificar si el usuario no está autenticado
      const isAuthenticated = token;/* Lógica para verificar la autenticación del usuario */;
      
      if (!isAuthenticated) {
        // Redirigir al usuario a la página de inicio de sesión
        router.push("/login");
      }
    }, [token, router]);

  return (
    <div>
      <Header />
      <div >
        <div >

          <div className={Styles.container}>
            {children}
          </div>
        </div>
      </div>
      <div >
            <Footer />
          </div>
    </div>
  );
}
