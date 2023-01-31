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
  width: 300px;
  height: 500px;
  padding-top: 5%;
  float: left;
`;

const FormWrapper = styled(Form)`
  padding: 15px;
  border: 1px solid gray;
  width: 100%;
  text-align: center;
`;

const LoginButton = styled(Button)`
  margin-top: 15px;
  width: 100%;
`;

const SignupWrapper = styled.div`
  width: 100%;
  padding: 12px;
  margin-top: 30px;
  border: 1px solid gray;
  text-align: center;
`;

function LoginForm() {
  const { logInLoading, logInError, logInDone, me } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);
  // id, password 값이 변하지 않는 한 기존 함수 재사용
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password })); // redux useDispatch로 로그인 액션 실행
    if (logInDone && me);
    // Router.push('/main');
  }, [email, password]);

  return (
    <LoginFormWrapper>
      <FormWrapper onFinish={onSubmitForm}>
        <h1>Login</h1>
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
