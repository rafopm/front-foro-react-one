import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const NavbarForo = ({ categoryParam, setCategoryParam }) => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleCategoryChange = (categoria) => {
    setCategoryParam(categoria);
    router.push(`/forum/${categoria}`);
  };

  const handleCategoryFilter = (categoria) => {
    setCategoryParam(categoria);
    router.push(`/forum/categoria/${categoria}`);
  };

  return (
    <nav>
      <Link href={`/forum/${categoryParam || "todos"}`}>
        <span className={categoryParam === "todos" ? "active" : ""}>Todos</span>
      </Link>

      <Link href={`/forum/${categoryParam || "resueltos"}`}>
        <span className={categoryParam === "resueltos" ? "active" : ""}>
          Resueltos
        </span>
      </Link>

      <Link href={`/forum/${categoryParam || "sinrespuesta"}`}>
        <span className={categoryParam === "sinrespuesta" ? "active" : ""}>
          Sin Respuesta
        </span>
      </Link>
    </nav>
  );
};

export default NavbarForo;
