import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

const LoginWrapper = styled.div`
  width: 100%;
  height: 745px;
`;
const MainImage = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background-image: url(images/login_back.png);
  background-size: cover;
  background-position: center;
`;
const LoginSubWrapper = styled.div`
  padding-top: 5%;
  padding-left: 7%;
  width: 50%;
  float: left;
  font-family: sans-serif;
  font-weight: bold;
  height: 100%;
`;

const Login = () => {
  const { logInDone, me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      console.log(me);
      Router.push('/main');
    }
  }, [me]);

  return (
    <>
      <LoginWrapper>
        <MainImage></MainImage>
        <LoginSubWrapper>
          <h1 style={{ fontWeight: 'bolder', fontSize: '3rem' }}>
            지금 일어나고 있는 일
          </h1>
          <h2 style={{ fontWeight: 'bolder', fontSize: '2rem' }}>
            오늘 SNS에 가입하세요.
          </h2>
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
