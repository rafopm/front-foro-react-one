import { createContext, useEffect, useState } from "react";
import { getUserDataAPI, loginAPI } from "@/lib/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";


export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [userLogeado, setUserLogeado] = useState({
    idusuario: "",
    nombre: "",
    email: "",
    activo: false,
  });
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(() => {
    const emailFromCookie = Cookies.get("email");
    return emailFromCookie || "";
  });
  const router = useRouter();

  console.log("getuserdata1",email, token);//NO RECUPERO token, solo email
  const getUserData = async () => {
    console.log("getuserdata2",email, token);//NO RECUPERO token, solo email
    try {
      const userData = await getUserDataAPI(token, email);
      

      if (userData) {
        setUserLogeado(userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchToken = async () => {
    const tokenFromCookie = Cookies.get("token");
    const emailFromCookie = Cookies.get("email");
  
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      setEmail(emailFromCookie); // Guarda el email en el estado
      
    } else {
      getUserData();
    }
  };
  
  useEffect(() => {
    fetchToken();
  }, []);
  
  useEffect(() => {
    if (token && email) {
      getUserData();
    }
  }, [token, email]);

  const login = async (credentials) => {
    try {
      const token = await loginAPI(credentials);
  
      if (token) {
        const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;
  
        Cookies.set("token", token, {
          expires: new Date(expirationTime),
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("email", credentials.email, {
          expires: new Date(expirationTime),
          path: "/",
          secure: true,
          sameSite: "strict",
        });
  
        setUserLogeado({
          ...userLogeado,
          email: credentials.email,
        });
  
        setToken(token);
        getUserData();
        router.push("/dashboard");
      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    setToken(null);
    setUserLogeado({
      idusuario: "",
      nombre: "",
      email: "",
      activo: false,
    });
  };

  return (
    <AuthContext.Provider value={{ userLogeado, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
