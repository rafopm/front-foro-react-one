import { FadeLoader } from "react-spinners";
import React from "react";
import style from "../styles/Spinner.module.css";

const Spinner = (props) => {
  return (
    <div className={style.overlay}>
      <div className={style.spinner}>
        <FadeLoader color={"white"} loading={props.isFetching} />
      </div>
    </div>
  );
};

export default Spinner;
