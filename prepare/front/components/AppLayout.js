import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import useInput from '../hooks/useInput';
import Router from 'next/router';
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`

  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child{
    padding-left: 0 !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
  }

`;

function AppLayout({ children }) {
  // redux useSelector로 store에 저장된 데이터 가져오기
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSerchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu mode='vertical'>
        <Menu.Item>
          <Link href='/main'>
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'>
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/allpost'>
            <a>All post</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'>
            <a>BookMarks</a>
          </Link>
        </Menu.Item>
        {/* <Menu.Item>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSerchInput}
            onSearch={onSearch}
          />
        </Menu.Item> */}
      </Menu>

      {/* 반응형 그리드 antd에서 정한 breakpoint가 되면 25%, 50%, 25%차지*/}
      {/* gutter: column사이의 간격 */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile title={'로그아웃'} /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          {/* target _blank는 보안 위협이 있어서 rel과 같이 사용 
          어떤창에서 열었는지에 대한 정보를  noreferrer noopener로 보안 위협 방지*/}
          <a
            href='https://www.zerocho.com'
            target='_blank'
            rel='noreferrer noopener'
          >
            Made by Hajung
          </a>
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
