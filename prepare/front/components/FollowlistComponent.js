import React from 'react';
import { Avatar, Card, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST } from '../reducers/user';
import { LOAD_ALLUSER_REQUEST } from '../reducers/user';
const CradWrapper = styled(Card)`
  position: relative;
  background-color: #f2f2f2;
  border: none;
  :focus,
  :hover,
  :active {
    background-color: lightgray;
  }
  button {
    position: absolute;
    right: 28px;
    top: 26px;
    background: black;
    color: white;
    padding: 3px;
    width: 70px;
    border-radius: 15px;

    :hover,
    :active,
    :focus {
      cursor: pointer;
    }
  }
`;

function FollowlistComponent({ follow }) {
  const dispatch = useDispatch();
  const { recommendFollowList } = useSelector((state) => state.user);
  const requestFollow = () => {
    const lastId_list = recommendFollowList.length;
    dispatch({
      type: FOLLOW_REQUEST,
      data: follow.id,
    });
    dispatch({
      type: LOAD_ALLUSER_REQUEST,
      lastId_list,
    });
  };
  return (
    <CradWrapper>
      <Card.Meta
        avatar={
          <Link href={`/user/${follow.id}`}>
            <a>
              <Avatar src={`http://localhost:3065/${follow.image}`}>
                {follow.nickname[0]}
              </Avatar>
            </a>
          </Link>
        }
        title={follow.nickname}
      />
      <div style={{ margin: '-10px 50px' }}>{follow.email}</div>
      <button onClick={requestFollow}>팔로우</button>
    </CradWrapper>
  );
}

export default FollowlistComponent;
