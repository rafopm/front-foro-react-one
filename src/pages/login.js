import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import Link from 'next/link';

export default function Login() {
  const [emailUser, setEmailUser] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { email, token, userLogeado, login } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario no está autenticado
    const isAuthenticated = token; /* Lógica para verificar la autenticación del usuario */
    console.log("jfdksjfldskj---------------", email, token, userLogeado);
    if (isAuthenticated) {
      // Redirigir al usuario a la página de inicio de sesión
      router.push("/dashboard");
    }
  }, [token, router]);

  const handleLogin = async () => {
    try {
      const credentials = {
        email: emailUser,
        contrasena: contrasena,
      };

      const success = await login(credentials);

      if (success) {
        router.push("/dashboard");
      } else {
        setErrorMessage("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={emailUser}
        onChange={(e) => setEmailUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <Link onClick={handleLogin} href="/login">Iniciar sesión</Link>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
