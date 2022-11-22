import React, { useState } from 'react';
import { Button, Modal, Card, Avatar } from 'antd';

function EditContentModal({ post }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);
    console.log(editContent);
    setEditContent(post.content);
  };

  const [editContent, setEditContent] = useState(post.content);

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
            loading={loading}
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
