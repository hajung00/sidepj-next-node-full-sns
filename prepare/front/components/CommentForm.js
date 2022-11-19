import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
function CommentForm({ post }) {
  // 댓글 쓰는 user의 id
  const id = useSelector((state) => state.user.me?.id);
  const dispatch = useDispatch();
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const { addCommentDone } = useSelector((state) => state.post);
  // comment가 완료되면 그때 빈칸으로
  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <div>
      <Form onFinish={onSubmit}>
        <Form.Item style={{ position: 'relative', margin: 0 }}>
          <Input.TextArea
            value={commentText}
            onChange={onChangeCommentText}
            rows={4}
          />

          <Button type='primary' htmlType='submit'>
            삐약
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
