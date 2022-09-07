import React, { useCallback, useState } from 'react';
import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import PropTypes from 'prop-types';
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
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

function PostCard({ post }) {
  // 로그인 상태 확인 위해 user에 me:{id, password} 의 id를 가져온다
  // optional chaining연산자 : state.user.me && state.user.me.id를 state.user.me?.id
  const id = useSelector((state) => state.user.me?.id);

  // 좋아요 부분 눌렀을 때 토글
  const onLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  // 댓글 부분 눌렀을 때 토글
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const { removePostLoading } = useSelector((state) => state.post);
  // 삭제 버튼 누를때 post삭제
  const dispatch = useDispatch();
  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        // post의 Images가 있으면 PostImages 컴포넌트에 Images 전달
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          // 배열 안에 jsx 넣을때는 key 속상 작성
          <RetweetOutlined key='retweet' />,

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
                    <Button>수정</Button>
                    <Button
                      type='danger'
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          // 해시태그 분별 conponent
          description={<PostCardContent postData={post.content} />}
        />
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
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
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
  }).isRequired,
};
export default PostCard;
