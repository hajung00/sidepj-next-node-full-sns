import React, { useCallback, useState } from 'react';
import { Button, Modal, Card, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_CONTENT_REQUEST } from '../reducers/post';
import styled from 'styled-components';

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
const EditButton = styled(Button)`
  --antd-wave-shadow-color: none;
  background-color: black;
  color: white;
  border-radius: 20px;
  width: 70px;
  float: right;
  border: 1px solid black;
  margin-left: 10px;
  :hover,
  :active,
  :focus {
    border: 1px solid black;
    color: black;
    border-color: black;
    background-color: #fff;
  }
`;

const EditButton1 = styled(Button)`
  --antd-wave-shadow-color: none;
  background-color: white;
  color: black;
  border-radius: 20px;
  width: 70px;
  float: right;
  border: 1px solid black;

  :hover,
  :active,
  :focus {
    border: 1px solid white;
    color: white;
    border-color: black;
    background-color: black;
  }
`;

const SetModal = styled(Modal)`
  --antd-wave-shadow-color: none;
  .ant-modal-footer {
    height: 53px;
  }
`;

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
      <SetButton
        onClick={() => {
          setOpen(true);
        }}
      >
        수정
      </SetButton>
      <SetModal
        open={open}
        title='게시글 수정'
        onOk={onSubmit}
        onCancel={() => {
          setOpen(false);
        }}
        visible={open}
        footer={[
          <EditButton
            key='back'
            onClick={() => {
              setOpen(false);
            }}
          >
            취소
          </EditButton>,
          <EditButton1
            key='submit'
            loading={editContentLoading}
            onClick={onSubmit}
          >
            수정
          </EditButton1>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={
            <textarea
              style={{ width: '395px', height: '110px' }}
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            ></textarea>
          }
        />
      </SetModal>
    </div>
  );
}

export default EditContentModal;
