import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostListPage from ".";
import CategoryContext from "../../context/CategoryContext";

const ForumCategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [categoryParam, setCategoryParam] = useState("");

  useEffect(() => {
    setCategoryParam(category || "");
  }, [category]);

  return (
    
      <PostListPage />
    
  );
};

export default ForumCategoryPage;
