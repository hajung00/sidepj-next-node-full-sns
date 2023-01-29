import React, { useCallback, useEffect, useState, useRef } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button, Avatar } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  signUpRequestAction,
  SIGN_UP_REQUEST,
  UPLOAD_PROFILEIMAGES_REQUEST,
} from '../reducers/user';
import Router from 'next/router';
import Link from 'next/link';
const MainImage = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-image: url(images/login_back.png);
  background-size: cover;
  background-position: center;
`;
const ErrorMessage = styled.div`
  color: red;
`;

const SignupPageWrapper = styled.div`
  width: 100%;
  height: 745px;
  float: left;
`;
const SignUpFormWrapper = styled.div`
width: 50%;
height: 100%;
float: left;
padding-left: 14%;
padding-top: 4%;
font-family: sans-serif;
font-weight: bold;
}
`;

const FormWrapper = styled(Form)`
  padding: 15px;
  border: 1px solid gray;
  width: 300px;
  text-align: center;
`;

const InputWrapper = styled.div`
  margin-top: 10px;
`;

const SignupWrapper = styled.div`
  width: 300px;
  padding: 20px 20px;
  margin-top: 30px;
  border: 1px solid gray;
  text-align: center;
`;

const Signup = () => {
  // 커스텀 훅 사용
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickName] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 비밀번호와 비밀번호 확인이 같지 않으면 passwordError는 true
  // 비밀번호 확인은 입력한 비밀번호와 입력했는지 확인해야 하기 때문에 커스텀 훅 x
  const [passwordcheck, setChangePasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const fileInput = useRef(null);
  const [File, setFile] = useState('');
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setChangePasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  // check box(동의) 눌렀는지 확인
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked); // 눌렀으면 true
    setTermError(false);
  });

  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me, profileImg } =
    useSelector((state) => state.user);
  console.log(me);
  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  // 제출했을 때, 비밀번호 같은지, check box(동의) 눌렀는지 확인
  const [request, setRequest] = useState(false);

  const onSubmit = () => {
    if (password !== passwordcheck) setPasswordError(true);
    if (!term) setTermError(true);
    const formData = new FormData();
    profileImg.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);
    setRequest(true);
    console.log(request);
    if (request) {
      console.log('액션실행');
      requestAction(formData);
    }
  };

  const requestAction = (formData) => {
    console.log(request, formData);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: formData,
    });
  };
  const onChange = useCallback((e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
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

  return (
    <SignupPageWrapper>
      <MainImage />
      <SignUpFormWrapper>
        <Head>
          <title>회원가입</title>
        </Head>

        {/* 가입하기 버튼 누르면 submit되어 onFinish 실행 */}

        <FormWrapper onFinish={onSubmit}>
          <h1>Signup</h1>
          <InputWrapper>
            <label htmlFor='user-email'>프로필 사진</label>
            <div>
              <Avatar
                src={Image}
                style={{ width: '100px' }}
                size={100}
                onClick={() => {
                  fileInput.current.click();
                }}
              />
              <input
                type='file'
                style={{ display: 'none' }}
                name='profile_img'
                onChange={onChange}
                ref={fileInput}
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor='user-email'>아이디</label>
            <br />
            <Input
              name='user-email'
              type='email'
              value={email}
              onChange={onChangeEmail}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor='user-nickname'>닉네임</label>
            <br />
            <Input
              name='user-nickname'
              value={nickname}
              onChange={onChangeNickName}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor='user-password'>비밀번호</label>
            <br />
            <Input
              name='user-password'
              value={password}
              onChange={onChangePassword}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor='user-passwordCheck'>비밀번호 확인</label>
            <br />
            <Input
              name='user-passwordCheck'
              value={passwordcheck}
              onChange={onChangePasswordCheck}
              required
            />
            {passwordError ? (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            ) : null}
          </InputWrapper>
          <div style={{ marginTop: '10px' }}>
            <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
              동의합니다.
            </Checkbox>
            {termError ? (
              <ErrorMessage>약관을 동의해주세요.</ErrorMessage>
            ) : null}
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={signUpLoading}
              onClick={onSubmit}
            >
              가입하기
            </Button>
          </div>
        </FormWrapper>
        <SignupWrapper>
          계정이 있으신가요?
          <Link href='/'>
            <a> 로그인</a>
          </Link>
        </SignupWrapper>
      </SignUpFormWrapper>
    </SignupPageWrapper>
  );
};
export default Signup;
