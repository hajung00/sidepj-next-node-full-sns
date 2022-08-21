import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

function UserProfile() {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction()); // redux useDispatch로 로그아웃 액션 실행
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />0
        </div>,
        <div key='followings'>팔로잉</div>,
        <div key='follower'>팔로워</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title='HaJung'
      />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
}

export default UserProfile;
