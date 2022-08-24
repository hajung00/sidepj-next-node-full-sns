import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function UserProfile() {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction()); // redux useDispatch로 로그아웃 액션 실행
  }, []);

  const { logOutLoading, me } = useSelector((state) => state.user);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key='followings'>
          팔로잉 <br />
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
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
}

export default UserProfile;
