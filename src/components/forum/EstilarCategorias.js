import React from "react";
import Styles from "../../styles/Forum.module.css";

const EstilarCategorias = ({ categorymap }) => {
  const getCategoryBorderStyle = (categoria) => {
    let borderColor = "";

    switch (categoria) {
      case "Diseño gráfico":
        borderColor = "#ff8c2a";
        break;
      case "Programación":
        borderColor = "#2a8cff";
        break;
      case "Marketing digital":
        borderColor = "#f800f8";
        break;
      case "Idiomas":
        borderColor = "#32fb00";
        break;
      default:
        borderColor = "#000000";
        break;
    }

    return `3px solid ${borderColor}`;
  };
  return (
    <div className={Styles.categoriascontainer}>
      <ul className={Styles.categorylist}>
        {categorymap.map((categoria, index) => (
          <li
            key={index}
            style={{
              borderLeft: getCategoryBorderStyle(categoria),
            }}
            className={Styles.iconcategory}
          >
            {categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstilarCategorias;
