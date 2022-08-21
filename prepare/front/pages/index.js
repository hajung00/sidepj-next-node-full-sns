import React from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      <AppLayout>
        {/* 로그인해야 게시물 작성 가능 */}
        {isLoggedIn && <PostForm />}
        {/* 작성글이 있으면 보여줌 */}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};
export default Home;
