import { loginAPI } from "@/lib/auth";
import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const token = await loginAPI(credentials);

      // Verificar si el inicio de sesión fue exitoso
      if (token) {
        // Actualizar el estado global con los datos del usuario
        setUser({
          email: credentials.email,
          token: token,
        });
      } else {
        // Manejar el caso de inicio de sesión fallido
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

