import { loginAPI } from "@/lib/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', token: null });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedToken && expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime < expirationTime) {
        // Usuario autenticado, actualizar el estado global
        setUser({ email: "usuario@example.com", token: storedToken });
        setToken(storedToken); // Establecer el token en el estado
      } else {
        // Token expirado, eliminar datos de autenticación
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
      }
    }
  }, []);

  // Dentro de la función `login` en `AuthProvider`
  const login = async (credentials) => {
    try {
      const token = await loginAPI(credentials);

      if (token) {
        // Calcular la fecha de expiración (2 horas en milisegundos)
        const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;

        // Guardar el token y la fecha de expiración en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);

        // Actualizar el estado global con los datos del usuario
        setUser({
          email: credentials.email,
          token: token,
        });
        setToken(token); // Establecer el token en el estado
      } else {
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Eliminar los datos de autenticación de localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  
    // Actualizar el estado global con usuario nulo
    setUser({ email: '', token: null });
    setToken(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
