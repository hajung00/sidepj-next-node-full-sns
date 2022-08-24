import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

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
    dispatch(addPost(text)); // redux useDispatch로 addpost 액션 실행
  }, [text]);

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
