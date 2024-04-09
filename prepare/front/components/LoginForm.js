import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import Router from 'next/router';

// styled components
// ButtonWrapper div태그로
// const ButtonWrapper = styled.div`
//   margin-top: 10px;
// `;

const LoginFormWrapper = styled.div`
  min-width: 350px;
  margin: 0 auto;
  max-width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormWrapper = styled(Form)`
  padding: 15px;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  background: #fff;
  .logo {
    background-image: url(images/logo.png);
    background-size: cover;
    background-position: center;
    height: 205px;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 15px;
  width: 100%;
`;

const SignupWrapper = styled.div`
  width: 100%;
  padding: 12px;
  margin-top: 30px;
  border: 1px solid rgb(219, 219, 219);
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

function LoginForm() {
  const { logInLoading, logInError, logInDone, me } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  console.log(me);
  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);
  // id, password 값이 변하지 않는 한 기존 함수 재사용
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password })); // redux useDispatch로 로그인 액션 실행
  }, [email, password]);

  return (
    <LoginFormWrapper>
      <FormWrapper onFinish={onSubmitForm}>
        <div className='logo'></div>

        <div>
          <label htmlFor='user-id' type='email'>
            이메일
          </label>
          <br />
          <Input
            name='user-id'
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>

        <LoginButton
          type='primary'
          htmlType='submit'
          loading={logInLoading}
          onClick={onSubmitForm}
        >
          로그인
        </LoginButton>
      </FormWrapper>
      <SignupWrapper>
        계정이 없으신가요?
        <Link href='/signup'>
          <a> 가입하기</a>
        </Link>
      </SignupWrapper>
    </LoginFormWrapper>
  );
}

export default LoginForm;
