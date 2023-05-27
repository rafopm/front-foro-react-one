import { useState, createContext } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoryParam, setCategoryParam] = useState("");

  return (
    <CategoryContext.Provider value={{ categoryParam, setCategoryParam }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider, CategoryContext };
