import React from 'react'
import Styles from "../../styles/Forum.module.css";

const PostIsSolved = ({status}) => {
  return (
    <div className={Styles.iconcontainer}>
    {status === "RESUELTO" ? (
      <div className={Styles.iconsolved}>
        <img
          src="../images/icon-solved.svg"
          alt="Icono de topico resuelto"
        />
      </div>
    ) : (
      <div className={Styles.iconnotsolved}>
        <img
          src="../images/icon-not-solved.svg"
          alt="Icono de topico resuelto"
        />
      </div>
    )}
  </div>
  )
}

export default PostIsSolved