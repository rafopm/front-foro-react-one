import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { isEmail } from "validator";
import Image from "next/image";

export default function Login() {
  const [emailUser, setEmailUser] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const { email, token, userLogeado, login } = useContext(AuthContext);
  const router = useRouter();
  const [placeholderId, setPlaceholderId] = useState("Email ID");
  const [placeholderPass, setPlaceholderPass] = useState("Password");

  const handleIdFocus = () => {
    if (emailUser === "") {
      setPlaceholderId("");
    }
  };

  const handleIdBlur = () => {
    if (emailUser === "") {
      setPlaceholderId("Email ID");
    }
  };

  const handlePassFocus = () => {
    if (contrasena === "") {
      setPlaceholderPass("");
    }
  };

  const handlePassBlur = () => {
    if (contrasena === "") {
      setPlaceholderPass("Password");
    }
  };

  const handleIdChange = (e) => {
    setEmailUser(e.target.value);
  };

  const handlePassChange = (e) => {
    setContrasena(e.target.value);
  };

  useEffect(() => {
    // Verificar si el usuario no está autenticado
    const isAuthenticated =
      token; /* Lógica para verificar la autenticación del usuario */

    if (isAuthenticated) {
      // Redirigir al usuario a la página de inicio de sesión
      router.push("/dashboard");
    }
  }, [token, router]);

  const handleLogin = async () => {
    // Validar el formato de la dirección de correo electrónico
    if (!isEmail(emailUser)) {
      setError("Dirección de correo electrónico inválida");
      return;
    }

    try {
      const credentials = {
        email: emailUser,
        contrasena: contrasena,
      };

      const success = await login(credentials);

      if (!success) {
        setError("Verifique usuario o contraseña");
      } else {
        setError("");
        // Redirigir al usuario a la página de inicio después del inicio de sesión exitoso
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.right}>
            <div className={styles.titleWelcome}>Bienvenido</div>
            <div className={styles.infotext}>
              Este proyecto forma parte de los desafíos del programa ONE Foro
              Alura Latam (Spring Framework y API)
            </div>
            <div className={styles.logosContainer}>
              <div className={styles.titleLogos}>Tools:</div>
              <div className={styles.logos}>
                <Image
                  src="/images/logos/mysql.png"
                  width={100}
                  height={50}
                  alt="mysql"
                />
                <Image
                  src="/images/logos/java.png"
                  width={100}
                  height={50}
                  alt="java"
                />
                <Image
                  src="/images/logos/spring.png"
                  width={100}
                  height={50}
                  alt="Degspringree"
                />
                <Image
                  src="/images/logos/nextjs.png"
                  width={100}
                  height={50}
                  alt="nextjs"
                />
                <Image
                  src="/images/logos/azure.png"
                  width={100}
                  height={50}
                  alt="azure"
                />
                <Image
                  src="/images/logos/react.png"
                  width={100}
                  height={50}
                  alt="react"
                />
              </div>
            </div>
            <div className={styles.descriptionText}>
              <ul>
                <li>
                  Se aplican buenas prácticas de diseño API Realiza CRUD con
                  base de datos MySQL.
                </li>
                <li>Usa Flyway para migración automática.</li>
                <li>Validaciones usando Bean Validation.</li>
                <li>Paginación.</li>
                <li>Autenticación y autorización.</li>
                <li>Autenticación y autorización.</li>
                <li>JSON Web Token.</li>
                <li>Retorno de códigos de errores HTTP.</li>
              </ul>
            </div>
            <div className={styles.repositorio}>
              <p>Repositorio en Github: {" "}</p>
              <Link href="https://github.com/rafopm/api-foro-java-one">
                <Image
                  src="/images/logos/github.png"
                  width={100}
                  height={50}
                  alt="github"
                /> 
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.loginTitle}>
            <Image
              src="/images/logo-one.svg"
              width={160}
              height={80}
              alt="react"
            />
          </div>
          <form>
            <div className={styles.userGroup}>
              <div className={styles.inputLogin}>
                <input
                  type="email"
                  placeholder={placeholderId}
                  value={emailUser}
                  onFocus={handleIdFocus}
                  onBlur={handleIdBlur}
                  onChange={handleIdChange}
                />
              </div>
              <div className={styles.lineLogin}></div>
            </div>
            <div className={styles.userGroup}>
              <div className={styles.inputLogin}>
                <input
                  type="password"
                  placeholder={placeholderPass}
                  value={contrasena}
                  onFocus={handlePassFocus}
                  onBlur={handlePassBlur}
                  onChange={handlePassChange}
                />
              </div>
              <div className={styles.lineLogin}></div>
            </div>
            <div className={styles.error}> {error && <p>{error}</p>}</div>

            <button
              className={styles.buttonLogin}
              type="button"
              onClick={handleLogin}
            >
              Ingresar
            </button>
          </form>
          <div className={styles.disclaimer}>
            El acceso solo estará disponible por pocos días ya que solo se trata
            de un test.
          </div>
          <div className={styles.usuarioTest}>
            <h3>Usuario y password para test</h3>
            <p>Usuario: juan@forotest.com</p>
            <p>Password: api-test*one</p>
          </div>
        </div>
      </div>
    </div>
  );
}
