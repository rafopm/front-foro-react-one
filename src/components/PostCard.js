import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <Link href={`/forum/post/${post.id}`}>Ver más</Link>
    </div>
  );
}
