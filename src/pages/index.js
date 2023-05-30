import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import styles from '../styles/Home.module.css'
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

export default function Forum() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  console.log("aut",isAuthenticated);
  useEffect(() => {
    if (!(isAuthenticated === undefined)) {
      router.push('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    
      <div className={styles.container}>
        <img className={styles.image} src="/blue_image.jpg" alt="Blue Image" />
        <h1 className={styles.title}>Foro de Cursos de Informática y Desarrollo Web</h1>
        <p className={styles.description}>
          ¡Bienvenido al foro de cursos de informática y desarrollo web! Únete a nuestra comunidad y comparte conocimientos, experiencias y recursos sobre programación, diseño web y mucho más.
        </p>
        <Link className={styles.button} href="/login">Ingresar</Link>
      </div>
   
  );
}
