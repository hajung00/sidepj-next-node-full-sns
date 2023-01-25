import React, { useCallback, useMemo, useState, useRef } from 'react';
import { Form, Avatar, Button, Modal, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  CHANGE_PROFILE_REQUEST,
  UPLOAD_PROFILEIMAGES_REQUEST,
} from '../reducers/user';

const EditButton = styled(Button)`
  --antd-wave-shadow-color: none;
  background-color: black;
  color: white;
  border-radius: 20px;
  width: 70px;
  float: right;
  border: 1px solid black;
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
  margin-left: 10px;
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
const ProfileEditForm = () => {
  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px',
  }));
  const { me, profileImg } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [File, setFile] = useState('');
  const [Image, setImage] = useState(
    me.image !== null ? `http://localhost:3065/${me.image}` : ''
  );

  const fileInput = useRef(null);
  console.log(profileImg);
  const onChange = useCallback((e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(me.image !== null ? `http://localhost:3065/${me.image}` : '');
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log('images', e.target.files);
    const imageFormData = new FormData(); // FormData 를 이용해 Mulitpart 형식 전송
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_PROFILEIMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    profileImg.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('nickname', nickname);
    dispatch({
      type: CHANGE_PROFILE_REQUEST,
      data: formData,
    });
    setOpen(false);
  }, [nickname, profileImg]);

  return (
    <>
      <EditButton
        onClick={() => {
          setOpen(true);
        }}
      >
        수정
      </EditButton>
      <SetModal
        open={open}
        title='프로필 수정'
        onOk={onSubmit}
        onCancel={() => {
          setOpen(false);
        }}
        visible={open}
        footer={[
          <EditButton1
            key='back'
            onClick={() => {
              setOpen(false);
            }}
          >
            취소
          </EditButton1>,
          <EditButton
            key='submit'
            //loading={editContentLoading}
            onClick={onSubmit}
          >
            수정
          </EditButton>,
        ]}
      >
        <Form style={style}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Avatar
              src={Image}
              style={{ width: '100px' }}
              size={100}
              onClick={() => {
                fileInput.current.click();
              }}
            >
              {me.nickname[0]}
            </Avatar>
            <input
              type='file'
              style={{ display: 'none' }}
              name='profile_img'
              onChange={onChange}
              ref={fileInput}
            />
            <Form.Item style={{ margin: '6% 5%' }}>
              <Input value={nickname} onChange={onChangeNickname} />
            </Form.Item>
          </div>
        </Form>
      </SetModal>
    </>
  );
};

export default ProfileEditForm;
