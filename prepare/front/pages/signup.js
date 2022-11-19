import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { signUpRequestAction } from '../reducers/user';
import Router from 'next/router';
import Link from 'next/link';

const ErrorMessage = styled.div`
  color: red;
`;

const SignupPageWrapper = styled.div`
  width: 100%;
  height: 730px;
  float: left;
`;
const SignUpFormWrapper = styled.div`
  width: 50%;
  height: 80%;
  float: left;
  padding-left: 10%;
  padding-top: 8%;
  font-family: sans-serif;
  font-weight: bold;
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
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );

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
  const onSubmit = useCallback(() => {
    if (password !== passwordcheck) setPasswordError(true);
    if (!term) setTermError(true);
    dispatch(signUpRequestAction({ email, nickname, password }));
  }, [email, password, passwordcheck, term]);

  return (
    <SignupPageWrapper>
      <div style={{ width: '50%', height: '100%', float: 'left' }}>
        <img
          alt='node-brid'
          src='images/login_back.png'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <SignUpFormWrapper>
        <Head>
          <title>회원가입 | NodeBird</title>
        </Head>

        {/* 가입하기 버튼 누르면 submit되어 onFinish 실행 */}

        <FormWrapper onFinish={onSubmit}>
          <h1>Node Brid</h1>
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
            <Button type='primary' htmlType='submit' loading={signUpLoading}>
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
