import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import ProfileEditForm from '../components/ProfileEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import useSWR from 'swr';
import axios from 'axios';
import UserProfile from '../components/UserProfile';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { me, unfollowDone } = useSelector((state) => state.user);

  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );
  console.log(followersData, followingsData);
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

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return '팔로잉/팔로워 로딩 중 에러 발생';
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <UserProfile title={'프로필 수정'} />
        <FollowList
          header='팔로잉'
          data={followingsData}
          onClickMore={loadMoreFollwings}
          loading={!followingsData && !followingError}
        />
        <FollowList
          header='팔로워'
          data={followersData}
          onClickMore={loadMoreFollwers}
          loading={!followersData && !followerError}
        />
      </AppLayout>
    </>
  );
};
export default Profile;
