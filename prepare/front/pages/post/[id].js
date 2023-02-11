import axios from 'axios';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import AppLayout from '../../components/AppLayout';
import { LOAD_POST_REQUEST, LOAD_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import PostCard from '../../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { useEffect } from 'react';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    singlePost,
    mainPosts,
    hasMorePosts,
    loadPostLoading,
    retweetError,
    accusePostError,
    accuseMessage,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const singlePost_1 = mainPosts.find((y) => y.id === parseInt(id));

  useEffect(() => {
    if (hasMorePosts < mainPosts.length) {
      if (hasMorePosts && !loadPostLoading) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        });
      }
    }
  }, [hasMorePosts, loadPostLoading, singlePost, mainPosts]);

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

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name='description' content={singlePost.content} />
        <meta
          property='og:title'
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property='og:description' content={singlePost.content} />
        <meta
          property='og:image'
          content={singlePost.Images[0] ? singlePost.Images.src : ''}
        />
        <meta property='og:url' content={`https://hajungsns.com/post/${id}`} />
      </Head>
      {singlePost_1 && <PostCard post={singlePost_1} />}
    </AppLayout>
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
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  }
);

export default Post;
