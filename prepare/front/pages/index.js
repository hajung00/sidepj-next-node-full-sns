import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const LoginWrapper = styled.div`
  min-width: 350px;
  height: 100vh;
  margin: 0 auto;
`;

const LoginSubWrapper = styled.div`
  padding: 3%;
  font-family: sans-serif;
  font-weight: bold;
  height: 100%;

  background: #f0f2f5;
`;

const Login = () => {
  const { logInDone, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      console.log(me);
      Router.push('/main');
    }
  }, [me]);

  return (
    <>
      <LoginWrapper>
        <LoginSubWrapper>
          <LoginForm />
        </LoginSubWrapper>
      </LoginWrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default Login;
