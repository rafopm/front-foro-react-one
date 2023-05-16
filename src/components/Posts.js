import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../api/api';
import Post from './Post';

const Posts = () => {
  const { data: posts, isLoading, isError } = useQuery('posts', getPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
