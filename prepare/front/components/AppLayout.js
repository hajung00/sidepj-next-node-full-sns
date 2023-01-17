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

const SearchInputWrapper = styled.div`
  backgroundcolor: red;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 60px;
`;

const Global = createGlobalStyle`

  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child{
    padding-left: 0 !important;
 
    position: relative !important;
   
  }
  .ant-col:nth-child(2){
    padding-left: 0 !important;
  
    position: relative !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
  
    position: relative !important;
   
  }


  .ant-menu-item-selected, .ant-menu-item-active{
    img {
      width: 30px !important;
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

  @media (max-width: 1200px ) and (min-width: 768px){
    
    .ant-col:first-child {
     -webkit-flex: 0 0 90px;
     
     ul li a{
     display:none;
     }
     ul li .more{
      display:none;
     }
    }

    .ant-col-md-4 {
      width:0px;
    }
    .ant-col-md-11{
      width:1500px;
    }
    .ant-col-md-9{
      width:0px;
    }
    .ant-col:nth-child(2){
     min-width:583px;
     margin-left:10%;
    }

    .ant-col:last-child{
     display:none;
    }
  }

  @media (max-width: 767px) {
    .ant-col:first-child {
      -webkit-flex: 0 0 90px;
      
      ul li a{
      display:none;
      }
      ul li .more{
       display:none;
      }
     }
 
     .ant-col-md-4 {
       width:0px;
     }
    .ant-col:nth-child(2){
     min-width:400px !important;
     margin-left:5% !important;
    }
    .ant-col:last-child{
      display:none;
  }


`;
const MenuItem_wrapper = styled.div`
  img {
    width: 26px;
    margin-right: 15px;
    margin-bottom: 2px;
  }

  font-size: 17px;
  font-weight: 600;
  margin: 10px 20px;

  // 더보기 버튼
  div div {
    width: 23px;
    height: 50px;
    position: relative;
    margin-top: 12px;
    margin-right: 20px;
  }
  div div:hover {
    cursor: pointer;
  }
  div div span {
    background: black;
    width: 20px;
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
      <Row gutter={50}>
        <Col md={4}>
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
                <Link href='/main'>
                  <>
                    <img
                      src={process.env.PUBLIC_URL + '../../images/home.jpg'}
                    />
                    <a>홈</a>
                  </>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto' }}>
              <MenuItem_wrapper>
                <Link href='/profile'>
                  <>
                    <img
                      src={process.env.PUBLIC_URL + '../../images/profile.png'}
                    />

                    <a>프로필</a>
                  </>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto' }}>
              <MenuItem_wrapper>
                <Link href='/allpost'>
                  <>
                    <img
                      src={process.env.PUBLIC_URL + '../../images/search.jpg'}
                    />

                    <a>탐색</a>
                  </>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto' }}>
              <MenuItem_wrapper>
                <Link href='#none'>
                  <>
                    <img
                      src={process.env.PUBLIC_URL + '../../images/alarm.jpg'}
                    />

                    <a>알림</a>
                  </>
                </Link>
              </MenuItem_wrapper>
            </Menu.Item>
            <Menu.Item style={{ height: 'auto', position: 'relative' }}>
              <MenuItem_wrapper>
                <Link href='#none'>
                  <>
                    <img
                      src={process.env.PUBLIC_URL + '../../images/message.jpg'}
                    />

                    <a>쪽지</a>
                  </>
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
                  <span className='more'>더 보기</span>
                </div>
              </MenuItem_wrapper>
            </Menu.Item>
          </Menu>
        </Col>
        <Col md={11}>
          <div
            style={{ position: 'absolute', left: '0', top: '0', width: '100%' }}
          >
            {children}
          </div>
        </Col>
        <Col md={9}>
          {/* target _blank는 보안 위협이 있어서 rel과 같이 사용 
          어떤창에서 열었는지에 대한 정보를  noreferrer noopener로 보안 위협 방지*/}
          <SearchInputWrapper>
            <Input.Search
              enterButton
              value={searchInput}
              onChange={onChangeSerchInput}
              onSearch={onSearch}
            />
            <div>아아</div>
          </SearchInputWrapper>
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
