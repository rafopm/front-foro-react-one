import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div >
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <Link href={`/forum/post/${post.id}`}>Ver más</Link>
    </div>
  );
}
