import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/dashboard.module.css";

const courses = [
  { title: "Front End: React", category: "Programación" },
  { title: "Back End: Java", category: "Programación" },
  { title: "Desarrollo personal", category: "Habilidades" },
  { title: "Gestión e Innovación", category: "Negocios" },
  { title: "Data Science", category: "Programación" },
  { title: "Diseño Gráfico", category: "Diseño" },
];



const DashboardPage = () => {

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Cursos Disponibles</h1>
        <div className={styles.cardsContainer}>
          {courses.map((course, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{course.title}</h2>
                <p className={styles.cardCategory}>{course.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
