import { loginAPI, getUserDataAPI } from "@/lib/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", token: null });
  const [userLogeado, setUserLogeado] = useState({
    idusuario: "",
    nombre: "",
    email: "",
    activo: false,
  });
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const storedUserLogeado = localStorage.getItem("userLogeado");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedToken && expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime < expirationTime) {
        setUser((prevUser) => ({
          ...prevUser,
          email: storedEmail,
          token: storedToken,
        }));
        setToken(storedToken);
        setEmail(storedEmail);
        setUserLogeado(storedUserLogeado);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userLogeado");
        localStorage.removeItem("email");
      }

      if (storedUserLogeado) {
        const parsedUserLogeado = JSON.parse(storedUserLogeado);
        setUserLogeado(parsedUserLogeado);
      }
    } else {
      // Si no hay datos de usuario en el localStorage, realizar la llamada para obtenerlos
      getUserData();
    }
  }, []);
  
  useEffect(() => {
    if (userLogeado) {
      localStorage.setItem("userLogeado", JSON.stringify(userLogeado));
    }
  }, [userLogeado]);

  
  const login = async (credentials) => {
    try {
      const token = await loginAPI(credentials);

      if (token) {
        const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;

        localStorage.setItem("token", token);
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("expirationTime", expirationTime);
        setUser((prevUser) => ({
          ...prevUser,
          email: credentials.email,
          token: token,
        }));
        setToken(token);
        setEmail(credentials.email);
        getUserData();
        router.push("/");
      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("email");
    localStorage.removeItem("userLogeado");
    setUser({ email: "", token: null });
    setToken(null);
    setUserLogeado({
      idusuario: "",
      nombre: "",
      email: "",
      activo: false,
    });
  };

  const getUserData = async () => {
    try {
      const userData = await getUserDataAPI(token, email);
      console.log("userData", userData);

      if (userData) {
        setUserLogeado(userData);
        localStorage.setItem("userLogeado", JSON.stringify(userData));
      }
     //console.log("cache",storedUserLogeado);//Se verifica que si guarda
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {

      getUserData();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, userLogeado, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
