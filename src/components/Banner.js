import React from "react";
import { useRouter } from "next/router";
import Styles from "../styles/Banner.module.css";

const Banner = () => {
  const router = useRouter();
  const { pathname } = router;

  let pageTitle = "";

  if (pathname === "/") {
    pageTitle = "DASHBOARD";
  } else if (pathname === "/forum") {
    pageTitle = "FORO";
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.banner}>
        <div className={Styles.title}>{pageTitle}</div>
      </div>
    </div>
  );
};

export default Banner;
