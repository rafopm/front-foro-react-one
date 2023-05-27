import Navbar from "./Navbar";
import NavbarForo from "./NavbarForo";
import Footer from "./Footer";
import Header from "./Header";
import Banner from "./Banner";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

export default function Layout({ children }) {
  const {token, userLogeado, logout,email } = useContext(AuthContext);
    const router = useRouter();
  
    useEffect(() => {
      // Verificar si el usuario no está autenticado
      const isAuthenticated = token;/* Lógica para verificar la autenticación del usuario */;
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        // Redirigir al usuario a la página de inicio de sesión
        router.push("/login");
      }
    }, []);

  return (
    <div>
      <Header />
      <div >
        <div >

          <div >
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
