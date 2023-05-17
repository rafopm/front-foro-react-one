import { useRouter } from 'next/router';

// Array de ejemplo con los posts
const posts = [
  { id: 1, title: 'Post 1', content: 'Contenido del Post 1' },
  { id: 2, title: 'Post 2', content: 'Contenido del Post 2' },
  { id: 3, title: 'Post 3', content: 'Contenido del Post 3' },
];

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Obtener el post con el ID proporcionado
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div>Post no encontrado</div>;
  }

  return (
    <div>
      <h1>Detalles del post: {post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;