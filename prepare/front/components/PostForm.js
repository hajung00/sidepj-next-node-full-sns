import React, { useCallback, useState, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

function PostForm() {
  // redux useSelector로 store에 저장된 데이터 가져오기
  const { imagePaths } = useSelector((state) => state.post);

  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const dispatch = useDispatch();

  // 짹짹 버튼 누르면
  const onSubmit = useCallback(() => {
    dispatch(addPost); // redux useDispatch로 로그아웃 액션 실행
    setText('');
  }, []);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType='multipart/form-data'
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='어떤 신기한 일이 있었나요?'
      />
      <div>
        <input type='file' multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{ float: 'right' }} htmlType='submit'>
          {' '}
          짹짹
        </Button>
      </div>
      {imagePaths.map((y) => {
        <div key={y} style={{ display: 'inline-block' }}>
          <img src={y} style={{ width: '200px' }} alt={y} />
          <div>
            <Button>제거</Button>
          </div>
        </div>;
      })}
    </Form>
  );
}

export default PostForm;
