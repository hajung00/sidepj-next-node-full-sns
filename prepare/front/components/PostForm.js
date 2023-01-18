import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const Header = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`;
const PostContent = styled(Input.TextArea)`
  border: none;
  border-radius: 5px;

  :focus {
    box-shadow: 0 0 0 2px lightgrey;
    border-right-width: 1px;
    outline: 0;
  }
`;
const PostWrapper = styled.div`
  button:nth-of-type(1) {
    background-color: #f2f2f2;
    border: none;
    border-radius: 15px;
    margin-top: 5px;
    :hover,
    :active,
    :focus {
      border-radius: 50%;
    }
  }
  button:nth-of-type(2) {
    float: right;
    background-color: gray;
    margin-top: 5px;
    color: white;
    font-weight: 600;
    width: 100px;
    border-radius: 15px;

    :hover,
    :active,
    :focus {
      border: 2px solid gray !important;
      transition: all 0.2s;
      font-size: 15px;
    }
  }
`;

function PostForm() {
  // redux useSelector로 store에 저장된 데이터 가져오기
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [text, onChangeText, setText] = useInput('');

  // post가 완료되면 그때 빈칸으로
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  // 짹짹 버튼 누르면
  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    }); // redux useDispatch로 addpost 액션 실행
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData(); // FormData 를 이용해 Mulitpart 형식 전송
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <>
      <Header>Home</Header>
      <Form
        style={{
          margin: '30px 0 10px',
          backgroundColor: '#f2f2f2',
          padding: '10px',
          borderRadius: '5px',
        }}
        encType='multipart/form-data'
        onFinish={onSubmit}
      >
        <PostContent
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder='What is happening?'
        />
        <PostWrapper>
          <input
            type='file'
            name='image'
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>
            <PictureOutlined />
          </Button>
          <Button htmlType='submit'>업로드</Button>
        </PostWrapper>
        {imagePaths.map((y, i) => (
          <div key={y} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${y}`}
              style={{ width: '200px' }}
              alt={y}
            />
            <div>
              <Button
                onClick={onRemoveImage(i)}
                style={{
                  marginTop: '5px',
                  borderRadius: '10px',
                }}
              >
                제거
              </Button>
            </div>
          </div>
        ))}
      </Form>
    </>
  );
}

export default PostForm;
