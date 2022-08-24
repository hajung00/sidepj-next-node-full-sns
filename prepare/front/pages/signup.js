import React, { useCallback, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useStore } from 'react-redux';
import { signUpRequestAction } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
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
  const { signUpLoading } = useStore((state) => state.user);

  // 제출했을 때, 비밀번호 같은지, check box(동의) 눌렀는지 확인
  const onSubmit = useCallback(() => {
    if (password !== passwordcheck) setPasswordError(true);
    if (!term) setTermError(true);
    dispatch(signUpRequestAction({ email, nickname, password }));
  }, [email, password, passwordcheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      {/* 가입하기 버튼 누르면 submit되어 onFinish 실행 */}
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor='user-email'>아이디</label>
          <br />
          <Input
            name='user-email'
            type='email'
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor='user-nickname'>닉네임</label>
          <br />
          <Input
            name='user-nickname'
            value={nickname}
            onChange={onChangeNickName}
            required
          />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
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
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            동의합니다.
          </Checkbox>
          {termError ? <ErrorMessage>약관을 동의해주세요.</ErrorMessage> : null}
        </div>
        <div>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
export default Signup;
