import Layout from "@/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/dashboard.module.css";

const courses = [
  {
    tipo: "PLAN DE ESTUDIO",
    title: "ONE | Fase 3 - Especialización Back-End",
    cantidad: "34/34",
    status: "ninguno",
  },
  {
    tipo: "FORMACIÓN",
    title: "Java y Spring Boot G4 - ONE",
    cantidad: "8/8",
    status: "completadoverde",
  },
  {
    tipo: "FORMACIÓN",
    title: "Emprendimiento G4",
    cantidad: "5/5",
    status: "completadonaranja",
  },
  {
    tipo: "FORMACIÓN",
    title: "Desarrollo personal",
    cantidad: "8/8",
    status: "completadonaranja",
  },
];

const DashboardPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Mi guía de estudios</h1>

        <div className={styles.cardsContainer}>
          {courses.map((course, index) => (
            <div key={index} className={styles.cardGroup}>
              <div className={styles.cardIcon}>
                {(() => {
                  switch (course.status) {
                    case "completadoverde":
                      return (
                        <Image
                          src="/images/degree-green.svg"
                          width={40}
                          height={54}
                          alt="Degree"
                        />
                      );
                    case "completadonaranja":
                      return (
                        <Image
                          src="/images/degree-orange.svg"
                          width={40}
                          height={54}
                          alt="Degree"
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
              <div className={styles.card}>
                <div className={styles.cardType}>{course.tipo}</div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{course.title}</h2>
                  <div className={styles.cardProgress}>
                    {course.status === "completadonaranja" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 146 146"
                        className="guide-card__progress-bar__svg"
                        fill="none"
                        style={{ transform: "rotate(calc( 1.0 * 180deg))" }}
                      >
                        <path
                          d="M146,73c0,19.4-7.7,37.9-21.4,51.6C110.9,138.3,92.4,146,73,146s-37.9-7.7-51.6-21.4C7.7,110.9,0,92.4,0,73 l31,0c0,11.1,4.4,21.8,12.3,29.7C51.2,110.5,61.9,115,73,115s21.8-4.4,29.7-12.3C110.5,94.8,115,84.1,115,73L146,73z"
                          fill="#ff8c2a"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 146 146"
                        className="guide-card__progress-bar__svg"
                        fill="none"
                        style={{ transform: "rotate(calc( 1.0 * 180deg))" }}
                      >
                        <path
                          d="M146,73c0,19.4-7.7,37.9-21.4,51.6C110.9,138.3,92.4,146,73,146s-37.9-7.7-51.6-21.4C7.7,110.9,0,92.4,0,73 l31,0c0,11.1,4.4,21.8,12.3,29.7C51.2,110.5,61.9,115,73,115s21.8-4.4,29.7-12.3C110.5,94.8,115,84.1,115,73L146,73z"
                          fill="#00c86f"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div className={styles.cardCantidadGroup}>
                    <div className={styles.cardCantidad}>{course.cantidad}</div>{" "}
                    <div className={styles.cardCursosCompletados}>cursos finalizados</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
