import React, { useCallback, useEffect, useState } from 'react';
import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PostImages from '../components/PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_COMMENT_REQUEST,
  ACCUSE_POST_REQUEST,
  ACCUSE_MESSAGE_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';
import EditContentModal from '../components/EditContentModal';
import styled from 'styled-components';
import { backUrl } from '../config/config';
moment.locale('ko');

const SetButton = styled(Button)`
  --antd-wave-shadow-color: none;
  :hover,
  :active,
  :focus {
    background-color: gray;
    color: white;
    border: 1px solid gray;
  }
`;
function PostCard({ post }) {
  // 로그인 상태 확인 위해 user에 me:{id, password} 의 id를 가져온다
  // optional chaining연산자 : state.user.me && state.user.me.id를 state.user.me?.id
  console.log(post);
  const { me } = useSelector((state) => state.user);
  const id = me.id;
  const liked = post.Likers.find((y) => y.id === id);
  const { removePostLoading, accuseMessageReset, accuseMessage } = useSelector(
    (state) => state.post
  );
  console.log(me);
  const [src, setSrc] = useState('');
  const [src_1, setSrc_1] = useState('');
  useEffect(() => {
    if (post.User.image !== null) {
      setSrc(`${backUrl}/${post.User.image}`);
    } else {
      setSrc('');
    }
  }, []);

  useEffect(() => {
    if (post.RetweetId && post.Retweet) {
      if (post.Retweet.User.image !== null) {
        setSrc_1(`${backUrl}/${post.Retweet.User.image}`);
      } else {
        setSrc_1('');
      }
    }
  });
  // 좋아요 부분 눌렀을 때 토글
  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  // 댓글 부분 눌렀을 때 토글
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  // 삭제 버튼 누를때 post삭제
  const dispatch = useDispatch();
  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  //댓글 삭제
  const removeComment = useCallback(
    (i) => {
      if (!id) {
        return alert('해당 댓글을 삭제할 수 없습니다.');
      }
      return dispatch({
        type: REMOVE_COMMENT_REQUEST,
        data: { postId: post.id, userId: id },
      });
    },
    [id]
  );

  // 게시글 신고
  const onAccusePost = useCallback(() => {
    if (accuseMessageReset) {
      dispatch({
        type: ACCUSE_MESSAGE_REQUEST,
      });
    }

    return dispatch({
      type: ACCUSE_POST_REQUEST,
      data: { content: post.content, postId: post.id, userId: id },
    });
  });

  console.log(accuseMessageReset, accuseMessage);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        // post의 Images가 있으면 PostImages 컴포넌트에 Images 전달
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          // 배열 안에 jsx 넣을때는 key 속상 작성
          <RetweetOutlined key='retweet' onClick={onRetweet} />,

          // 하트 버튼 누르면 빨간색
          liked ? (
            <HeartTwoTone
              key='heart'
              twoToneColor='#eb2f96'
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key='heart' onClick={onLike} />
          ),

          //댓글 버튼 누르면 댓글부분 열리게
          <MessageOutlined key='comment' onClick={onToggleComment} />,

          <Popover
            key='more'
            content={
              <Button.Group>
                {/* 내가 쓴 글일때는 수정, 삭제 아닐때는 신고 */}

                {id && post.User.id === id ? (
                  <>
                    <EditContentModal post={post} />
                    <SetButton
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </SetButton>
                  </>
                ) : (
                  <SetButton onClick={onAccusePost}>신고</SetButton>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: 'right' }}>
              {moment(post.createAt).format('YYYY.MM.DD')}
            </div>

            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                    {/* <Avatar src={src_1}>{post.Retweet.User.nickname[0]}</Avatar> */}
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              // 해시태그 분별 conponent
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>
              {moment(post.createAt).format('YYYY.MM.DD')}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    {/* <Avatar src={src}>{post.User.nickname[0]}</Avatar> */}
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              // 해시태그 분별 conponent
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>

      {/* 댓글 폼 */}
      {commentFormOpened ? (
        <div>
          {/* CommentForm에 post 넘겨주는 이유?? -> 게시글에 댓글 포함, 어떤 게시글에 댓글을 달건지 정보 필요 -> 게시글 아이디 필요 */}
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            // post.Comments가 하나하나 item으로 들어감
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        {/* <Avatar src={src}>{item.User.nickname[0]}</Avatar> */}
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
                <Button
                  onClick={() => {
                    removeComment(item.id);
                  }}
                >
                  삭제
                </Button>
              </li>
            )}
          />
        </div>
      ) : null}
    </div>
  );
}

PostCard.propTypes = {
  // post는 객체인데 여기서 더 자세히 검사하고 싶으면 shape 사용
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
export default React.memo(PostCard);
