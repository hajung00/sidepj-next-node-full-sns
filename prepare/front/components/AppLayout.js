import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import useInput from '../hooks/useInput';
import Router from 'next/router';
import { LOG_OUT_REQUEST } from '../reducers/user';

const SearchInput = styled(Input.Search)``;

const Global = createGlobalStyle`
// @media (max-width: 1020px) {
//   .ant-col:nth-child(2){
//     padding-left: 0 !important;
//     width:calc(100% - 200px) !important;
//     position: relative !important;}

//   .ant-col:last-child{
//       padding-right: 0 !important;
//       width:0px !important;
//       position: relative !important;
//       max-width: fit-content !important;
//       min-width: fit-content;
//     }
  
// }
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child{
    padding-left: 0 !important;
    width:200px !important;
    position: relative !important;
    max-width: fit-content !important;
    min-width: fit-content;
  }
  .ant-col:nth-child(2){
    padding-left: 0 !important;
    width:calc(100% - 400px) !important;
    position: relative !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
    width:200px !important;
    position: relative !important;
    max-width: fit-content !important;
    min-width: fit-content;
  }
  .ant-menu-item-selected, .ant-menu-item-active{
    img {
      width: 15% !important;
      transition: all 0.2s !important;
    }
     a {
      color: black !important;
      font-size: 18px !important;
      transition: all 0.1s !important;
    }
    span {
      color: black !important;
      font-size: 18px !important;
      transition: all 0.1s !important;
    }
    background-color:white !important;
    transition: all 0.2s !important;
  }

`;
const MenuItem_wrapper = styled.div`
  img {
    width: 12%;
    margin-right: 15px;
    margin-bottom: 2px;
  }

  font-size: 17px;
  font-weight: 600;
  margin: 10px 20px;

  // 더보기 버튼
  div div {
    width: 50px;
    height: 50px;
    position: relative;
    margin-top: 12px;
  }
  div div:hover {
    cursor: pointer;
  }
  div div span {
    background: black;
    width: 40%;
    height: 2px;
    display: block;
    position: absolute;
    left: 0;
  }
  div div span.a {
    top: 0px;
  }
  div div span.b {
    top: 8px;
  }
  div div span.c {
    top: 16px;
  }
  div span {
    font-size: 17px;
    font-weight: 600;
  }
`;

const LogoutBtn = styled.button`
  text-align: inherit;
  position: absolute;
  left: -15px;
  top: -60px;
  width: 210px;
  padding: 5px;
  padding-left: 15px;
  font-size: 16px;
  background: white;
  border: 1px solid #f0f0f0;
  box-shadow: 3px 3px 4px 1px #f0f0f0;
  border-radius: 5px;

  :hover {
    background-color: #f0f0f0;
    transition: all 0.1s;
    font-size: 17px;
    font-weight: bold;
    border-radius: 5px;
  }
`;

const LeftCol = styled(Col)`
  ul li:hover {
    img {
      width: 15%;
      transition: all 0.2s;
    }
    a {
      color: black;
      font-size: 18px;
      transition: all 0.1s;
    }
    span {
      color: black;
      font-size: 18px;
      transition: all 0.1s;
    }
    transition: all 0.2s;
  }
`;

function AppLayout({ children }) {
  // redux useSelector로 store에 저장된 데이터 가져오기
  const { me, logOutLoading } = useSelector((state) => state.user);
  const [searchInput, onChangeSerchInput] = useInput('');
  const dispatch = useDispatch();

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const [openModal, setOpenModal] = useState(false);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    Router.push('/');
  }, []);

  return (
    <div>
      <Global />

      {/* 반응형 그리드 antd에서 정한 breakpoint가 되면 25%, 50%, 25%차지*/}
      {/* gutter: column사이의 간격 */}
      <Row gutter={8}>
        <LeftCol xs={24} md={6}>
          {' '}
          {me ? <UserProfile main={true} /> : <Link href='/'>로그인 필요</Link>}
          <Menu
            mode='vertical'
            style={{
              padding: '80px 0',
            }}
          >
            <Menu.Item style={{ height: 'auto' }}>
              <MenuItem_wrapper>
                <img src={process.env.PUBLIC_URL + '../../images/home.jpg'} />
                <Link href='/main'>
                  <a>홈</a>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto' }}>
              <MenuItem_wrapper>
                <img
                  src={process.env.PUBLIC_URL + '../../images/profile.png'}
                />
                <Link href='/profile'>
                  <a>프로필</a>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto' }}>
              <MenuItem_wrapper>
                <img src={process.env.PUBLIC_URL + '../../images/search.jpg'} />
                <Link href='/allpost'>
                  <a>탐색</a>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto' }}>
              <MenuItem_wrapper>
                <img src={process.env.PUBLIC_URL + '../../images/alarm.jpg'} />
                <Link href='#none'>
                  <a>알림</a>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto', position: 'relative' }}>
              <MenuItem_wrapper>
                <img
                  src={process.env.PUBLIC_URL + '../../images/message.jpg'}
                />
                <Link href='#none'>
                  <a>쪽지</a>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item
              style={{
                height: 'auto',
                marginTop: '150px',
                overflow: 'visible',
              }}
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              <MenuItem_wrapper style={{ position: 'relative' }}>
                <div
                  style={{
                    display: 'flex',
                    height: '40px',
                  }}
                >
                  {' '}
                  {openModal ? (
                    <LogoutBtn onClick={onLogout} loading={logOutLoading}>
                      로그아웃
                    </LogoutBtn>
                  ) : (
                    ''
                  )}
                  <div>
                    <span className='a' />
                    <span className='b' />
                    <span className='c' />
                  </div>
                  <span>더 보기</span>
                </div>
              </MenuItem_wrapper>
            </Menu.Item>
          </Menu>
        </LeftCol>
        <Col
          // xs={24}
          // md={12}
          style={{
            background: 'yellow',
          }}
        >
          <div
            style={{ position: 'absolute', left: '0', top: '0', width: '100%' }}
          >
            {children}
          </div>
        </Col>
        <Col xs={24} md={6}>
          {/* target _blank는 보안 위협이 있어서 rel과 같이 사용 
          어떤창에서 열었는지에 대한 정보를  noreferrer noopener로 보안 위협 방지*/}
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSerchInput}
            onSearch={onSearch}
          />
        </Col>
      </Row>
    </div>
  );
}

// props 타입 검사
AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // children은 node타입(*node 타입: 화면에 그릴 수 있는 모든 것-return안)
};

export default AppLayout;
