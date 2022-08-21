import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';

function CommentForm({ post }) {
  const [commentText, onChangeCommentText] = useInput('');
  const onSubmit = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  // 댓글 쓰는 user의 id
  const id = useSelector((state) => state.user.me?.id);

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
