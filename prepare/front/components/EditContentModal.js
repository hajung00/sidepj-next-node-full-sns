import React, { useCallback, useState } from 'react';
import { Button, Modal, Card, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_CONTENT_REQUEST } from '../reducers/post';
function EditContentModal({ post }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [editContent, setEditContent] = useState(post.content);
  const { editContentLoading } = useSelector((state) => state.post);

  const onSubmit = useCallback(() => {
    dispatch({
      type: EDIT_CONTENT_REQUEST,
      data: { content: editContent, postId: post.id },
    });
    setOpen(false);
  }, [editContent]);

  return (
    <div>
      <Button
        type='primary'
        onClick={() => {
          setOpen(true);
        }}
      >
        수정
      </Button>
      <Modal
        open={open}
        title='게시글 수정'
        onOk={onSubmit}
        onCancel={() => {
          setOpen(false);
        }}
        visible={open}
        footer={[
          <Button
            key='back'
            onClick={() => {
              setOpen(false);
            }}
          >
            Return
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={editContentLoading}
            onClick={onSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={
            <textarea
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            ></textarea>
          }
        />
      </Modal>
    </div>
  );
}

export default EditContentModal;
