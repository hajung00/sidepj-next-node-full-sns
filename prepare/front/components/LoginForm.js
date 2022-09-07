import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

// styled components
// ButtonWrapper div태그로
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

function LoginForm() {
  const { logInLoading, logInError } = useSelector((state) => state.user);
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
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user-id' type='email'>
          이메일
        </label>
        <br />
        <Input name='user-id' value={email} onChange={onChangeEmail} required />
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
      <ButtonWrapper>
        <Button
          type='primary'
          htmlType='submit'
          loading={logInLoading}
          onClick={onSubmitForm}
        >
          로그인
        </Button>
        <Link href='/signup'>
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
}

export default LoginForm;
