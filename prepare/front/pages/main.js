import React, { useEffect } from 'react';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOAD_POSTS_REQUEST,
  LOAD_RELATIVE_POSTS_REQUEST,
} from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Main = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostLoading,
    retweetError,
    accusePostError,
    accuseMessage,
  } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    if (accusePostError) {
      alert(accusePostError);
    }
  }, [accusePostError]);

  useEffect(() => {
    if (accuseMessage) {
      alert(accuseMessage);
    }
  }, [accuseMessage]);

  // scroll
  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(
            //   {
            //   type: LOAD_POSTS_REQUEST,
            //   lastId,
            // },
            {
              type: LOAD_RELATIVE_POSTS_REQUEST,
              lastId,
            }
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostLoading, mainPosts]);

  return (
    <>
      <AppLayout>
        {/* 로그인해야 게시물 작성 가능 */}
        {me && <PostForm />}
        {/* 작성글이 있으면 보여줌 */}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_RELATIVE_POSTS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    // context.store.dispatch({
    //   type: LOAD_POSTS_REQUEST,
    // });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default Main;
