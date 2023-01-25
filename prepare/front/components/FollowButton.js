import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import styled from 'styled-components';

const SetButton = styled(Button)`
  --antd-wave-shadow-color: none;
  :hover,
  :active,
  :focus {
    border: 1px solid lightgray;
    background-color: lightgray;
    color: white;
  }
`;
function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings.find((y) => y.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);
  if (post.User.id === me.id) {
    return null;
  }

  return (
    <div>
      <SetButton
        onClick={onClickButton}
        loading={followLoading || unfollowLoading}
      >
        {isFollowing ? '언팔로우' : '팔로우'}
      </SetButton>
    </div>
  );
}

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};
export default FollowButton;
