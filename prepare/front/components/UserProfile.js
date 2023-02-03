import { Avatar, Card, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import Link from 'next/link';
import Router from 'next/router';
import ProfileEditForm from './ProfileEditForm';
import { backUrl } from '../config/config';
const UserProfile = ({ title, main }) => {
  const { me, logOutLoading, logOutDone } = useSelector((state) => state.user);
  const [src, setSrc] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (me.image !== null) {
      setSrc(`${backUrl}/${me.image}`);
    } else {
      setSrc('');
    }
  }, [me]);

  console.log(me);
  return (
    <>
      {main === true ? (
        <Card>
          <Card.Meta
            avatar={
              <Link href={`/user/${me.id}`}>
                <a>
                  {/* <Avatar src={src}>{me.nickname[0]}</Avatar> */}
                  <Avatar>{me.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={me.nickname}
          />
          {title === '프로필 수정' ? <ProfileEditForm /> : ''}
        </Card>
      ) : (
        <Card
          actions={[
            <div key='twit'>
              <Link href={`/user/${me.id}`}>
                <a>
                  게시글
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
                  {/* <Avatar src={src}>{me.nickname[0]}</Avatar> */}
                  <Avatar>{me.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={me.nickname}
          />
          {title === '프로필 수정' ? <ProfileEditForm /> : ''}
        </Card>
      )}
    </>
  );
};

export default UserProfile;
