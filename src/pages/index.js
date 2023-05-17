import Layout from "../components/Layout";
import PostCard from "../components/PostCard";

export default function Forum() {
  // Obtener posts del estado global o de la API

  const posts = [];

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
}
