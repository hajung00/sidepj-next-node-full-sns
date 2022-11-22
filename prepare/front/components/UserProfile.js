import { Avatar, Card, Button } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import Link from 'next/link';
import Router from 'next/router';
import ProfileEditForm from './ProfileEditForm';
const UserProfile = ({ title }) => {
  const { me, logOutLoading, logOutDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    Router.push('/');
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          <Link href={`/user/${me.id}`}>
            <a>
              짹짹
              <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,
        <div key='following'>
          <Link href={'/profile'}>
            <a>
              팔로잉
              <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key='follower'>
          <Link href={'/profile'}>
            <a>
              팔로워
              <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      {title === '프로필 수정' ? (
        <ProfileEditForm />
      ) : (
        <Button onClick={onLogout} loading={logOutLoading}>
          {title}
        </Button>
      )}
    </Card>
  );
};

export default UserProfile;
