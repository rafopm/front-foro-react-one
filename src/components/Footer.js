import React from "react";
import styles from "../styles/Footer.module.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <img
          src="/images/logo-aluraespanhol.svg"
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.column}>
        <h3>INSTRUCTORES</h3>
        <h3>BLOG</h3>
        <h3>SOBRE NOSOTROS</h3>
        <h3>PREGUNTAS FRECUENTES</h3>
      </div>
      <div className={styles.column}>
        <h3>SUGERENCIA DE CURSOS</h3>
        <h3>DISCORD ALURA</h3>
      </div>
      <div className={styles.column}>
        <h3>REDES DEL DESARROLLADOR</h3>
        <div className={styles.socialIcons}>
          {/* Aquí puedes agregar los íconos de las redes sociales */}
          <a href="https://www.linkedin.com/in/rafael-pampavilca/" className={styles.icon}  target="_blank" rel="noopener noreferrer">
            <span className={styles.icon}>
              <BsLinkedin />
            </span>
          </a>
          <a href="https://github.com/rafopm" className={styles.icon}  target="_blank" rel="noopener noreferrer">
            <span className={styles.icon}>
              <BsGithub />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
