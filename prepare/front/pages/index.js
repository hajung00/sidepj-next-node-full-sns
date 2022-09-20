import LoginForm from '../components/LoginForm';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  width: 100%;
  height: 730px;
`;

const LoginSubWrapper = styled.div`
  padding-top: 5%;
  padding-left: 10%;
  width: 50%;
  float: left;
  font-family: sans-serif;
  font-weight: bold;
  height: 100%;
`;

const Login = () => {
  return (
    <>
      <LoginWrapper>
        <div style={{ width: '50%', height: '100%', float: 'left' }}>
          <img
            alt='node-brid'
            src='images/login_back.png'
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <LoginSubWrapper>
          <h1 style={{ fontWeight: 'bolder', fontSize: '3rem' }}>
            지금 일어나고 있는 일
          </h1>
          <h2 style={{ fontWeight: 'bolder', fontSize: '2rem' }}>
            오늘 트위터에 가입하세요.
          </h2>
          <LoginForm />
        </LoginSubWrapper>
      </LoginWrapper>
    </>
  );
};

export default Login;
