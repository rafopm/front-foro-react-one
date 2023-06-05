import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
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
        <h3>SÍGUENOS EN NUESTRAS REDES SOCIALES</h3>
        <div className={styles.socialIcons}>
          {/* Aquí puedes agregar los íconos de las redes sociales */}
          <a href="#" className={styles.icon}>
            <img src="/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#" className={styles.icon}>
            <img src="/twitter-icon.png" alt="Twitter" />
          </a>
          <a href="#" className={styles.icon}>
            <img src="/instagram-icon.png" alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  ); 
};

export default Footer;
