import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import ProfileEditForm from '../components/ProfileEditForm';
import FollowList from '../components/FollowList';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import useSWR from 'swr';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';
// const fetcher = (url) =>
//   axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  console.log('me', me);
  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, [me.Followers, me.Followings]);
  // const { data: followersData, error: followerError } = useSWR(
  //   `http://localhost:3065/user/followers?limit=${followersLimit}`,
  //   fetcher
  // );
  // const { data: followingsData, error: followingError } = useSWR(
  //   `http://localhost:3065/user/followings?limit=${followingsLimit}`,
  //   fetcher
  // );
  // console.log(followersData, followingsData);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/');
    }
  }, [me && me.id]);

  const loadMoreFollwings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollwers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  // // 로그인 안했을 때 프로필 null
  // if (!me) {
  //   return '내 정보 로딩중...';
  // }

  // if (followerError || followingError) {
  //   console.error(followerError || followingError);
  //   return '팔로잉/팔로워 로딩 중 에러 발생';
  // }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <UserProfile title={'프로필 수정'} />
        <FollowList
          header='팔로잉'
          data={me.Followings}
          onClickMore={loadMoreFollwings}
          //loading={!followingsData && !followingError}
        />
        <FollowList
          header='팔로워'
          data={me.Followers}
          onClickMore={loadMoreFollwers}
          //loading={!followersData && !followerError}
        />
      </AppLayout>
    </>
  );
};
export default Profile;
