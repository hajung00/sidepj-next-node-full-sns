import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';

import axios from 'axios';
import {
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_REQUEST,
  LOAD_POSTS_REQUEST,
} from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import Head from 'next/head';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { hashTagPosts, mainPosts, hasMorePosts, loadPostsLoading } =
    useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);
  console.log(mainPosts);

  useEffect(() => {
    if (hasMorePosts < mainPosts.length) {
      if (hasMorePosts && !loadPostsLoading) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        });
      }
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      lastId: 0,
      data: tag,
    });
  }, [mainPosts]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId: hashTagPosts[hashTagPosts.length - 1]?.id,
            data: tag,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hashTagPosts.length, hasMorePosts, tag, loadPostsLoading]);

  useEffect(() => {
    console.log('tag', tag);
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
      lastId: 0,
    });
    dispatch({
      type: LOAD_HASHTAG_REQUEST,
    });
  }, [tag]);

  return (
    <AppLayout>
      {me && (
        <Head>
          <title>
            {me.nickname}
            님의 글
          </title>
          <meta name='description' content={`${me.nickname}님의 게시글`} />
          <meta property='og:title' content={`${me.nickname}님의 게시글`} />
          <meta
            property='og:description'
            content={`${me.nickname}님의 게시글`}
          />
          <meta
            property='og:url'
            content={`https://hajungsns.com/user/${me.id}`}
          />
        </Head>
      )}
      {me ? (
        <Card
          actions={[
            <div key='twit'>
              짹짹
              <br />
              {me.Posts.length}
            </div>,
            <div key='following'>
              팔로잉
              <br />
              {me.Followings.length}
            </div>,
            <div key='follower'>
              팔로워
              <br />
              {me.Followers.length}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{me.nickname[0]}</Avatar>}
            title={me.nickname}
          />
        </Card>
      ) : null}
      {hashTagPosts.map((c) => (
        <PostCard post={c} />
      ))}
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
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: context.params.tag,
      lastId: 0,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Hashtag;
