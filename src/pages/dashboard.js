import Layout from "@/components/Layout";
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
    status: "completadoverde",
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
        <h1 className={styles.title}>Guía de estudios</h1>

        <div className={styles.cardsContainer}>
          {courses.map((course, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <div>
                  {course.status === "completadoverde" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="52"
                    >
                      <defs>
                        <symbol viewBox="0 0 37 52" id="banner">
                          <path d="M2 0h32.537a2 2 0 012 2v33.619a2 2 0 01-.696 1.517l-16.269 13.98a2 2 0 01-2.607 0L.696 37.136A2 2 0 010 35.619V2a2 2 0 012-2z" />
                          <path
                            fill="#00FF00"
                            d="M18.808 24.274l-8.194-4.107 8.194-4.108 8.194 4.108-8.194 4.107zm6.15 3.893c0 .58-.612 1.193-1.662 1.667v-6.692l1.662-.833v5.858zm-6.15 2.5c-3.625 0-6.15-1.318-6.15-2.5v-5.858l5.927 2.972a.496.496 0 00.446 0l3.268-1.639v6.559c-.967.285-2.154.466-3.491.466zM23.49 34h-1.386l.693-.973.693.973zm4.85-14.28l-9.31-4.667a.5.5 0 00-.445 0l-9.31 4.666a.5.5 0 000 .895l2.385 1.195v6.358c0 1.962 3.14 3.5 7.148 3.5 1.276 0 2.464-.157 3.49-.434v.774l-1.569 2.202a.502.502 0 00.406.791h3.325a.499.499 0 00.406-.79l-1.57-2.203v-1.1c1.63-.636 2.66-1.618 2.66-2.74v-6.358l2.384-1.195a.5.5 0 000-.895z"
                            opacity=".9"
                          />
                        </symbol>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="52"
                    >
                      <defs>
                        <symbol viewBox="0 0 37 52" id="banner">
                          <path d="M2 0h32.537a2 2 0 012 2v33.619a2 2 0 01-.696 1.517l-16.269 13.98a2 2 0 01-2.607 0L.696 37.136A2 2 0 010 35.619V2a2 2 0 012-2z" />
                          <path
                            fill="#00FF00"
                            d="M18.808 24.274l-8.194-4.107 8.194-4.108 8.194 4.108-8.194 4.107zm6.15 3.893c0 .58-.612 1.193-1.662 1.667v-6.692l1.662-.833v5.858zm-6.15 2.5c-3.625 0-6.15-1.318-6.15-2.5v-5.858l5.927 2.972a.496.496 0 00.446 0l3.268-1.639v6.559c-.967.285-2.154.466-3.491.466zM23.49 34h-1.386l.693-.973.693.973zm4.85-14.28l-9.31-4.667a.5.5 0 00-.445 0l-9.31 4.666a.5.5 0 000 .895l2.385 1.195v6.358c0 1.962 3.14 3.5 7.148 3.5 1.276 0 2.464-.157 3.49-.434v.774l-1.569 2.202a.502.502 0 00.406.791h3.325a.499.499 0 00.406-.79l-1.57-2.203v-1.1c1.63-.636 2.66-1.618 2.66-2.74v-6.358l2.384-1.195a.5.5 0 000-.895z"
                            opacity=".9"
                          />
                        </symbol>
                      </defs>
                    </svg>
                  )}
                </div>
                <h2 className={styles.cardType}>{course.tipo}</h2>
                <h2 className={styles.cardTitle}>{course.title}</h2>
                <div>
                  {course.tipo === "PLAN DE ESTUDIO" ? (
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
                        fill="#ff8c2a"
                      ></path>
                    </svg>
                  )}
                </div>
                <p className={styles.cardCantidad}>{course.cantidad}</p>
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="52"
                    >
                      <defs>
                        <symbol viewBox="0 0 37 52" id="banner">
                          <path d="M2 0h32.537a2 2 0 012 2v33.619a2 2 0 01-.696 1.517l-16.269 13.98a2 2 0 01-2.607 0L.696 37.136A2 2 0 010 35.619V2a2 2 0 012-2z" />
                          <path
                            fill="#00FF00"
                            d="M18.808 24.274l-8.194-4.107 8.194-4.108 8.194 4.108-8.194 4.107zm6.15 3.893c0 .58-.612 1.193-1.662 1.667v-6.692l1.662-.833v5.858zm-6.15 2.5c-3.625 0-6.15-1.318-6.15-2.5v-5.858l5.927 2.972a.496.496 0 00.446 0l3.268-1.639v6.559c-.967.285-2.154.466-3.491.466zM23.49 34h-1.386l.693-.973.693.973zm4.85-14.28l-9.31-4.667a.5.5 0 00-.445 0l-9.31 4.666a.5.5 0 000 .895l2.385 1.195v6.358c0 1.962 3.14 3.5 7.148 3.5 1.276 0 2.464-.157 3.49-.434v.774l-1.569 2.202a.502.502 0 00.406.791h3.325a.499.499 0 00.406-.79l-1.57-2.203v-1.1c1.63-.636 2.66-1.618 2.66-2.74v-6.358l2.384-1.195a.5.5 0 000-.895z"
                            
                          />
                        </symbol>
                      </defs>
                    </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
