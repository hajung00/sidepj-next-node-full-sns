import React, { useEffect } from 'react';
import { List, Button, Card, Avatar } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { backUrl } from '../config/config';
const EditButton = styled(Button)`
  --antd-wave-shadow-color: none;
  background-color: white;
  color: gray;
  border-radius: 19px;
  width: 80px;
  float: right;
  border: 2px solid gray;
  position: absolute;
  right: 20px;
  top: 3px;
  margin: 5px;
  :hover,
  :active,
  :focus {
    border: 2px solid gray;
    color: white;
    background-color: gray;
  }
`;
const SetList = styled(List)`
  margin: 20px 0px;
  .ant-list-header {
    height: 50px;
  }
`;
function FollowList({ header, data, onClickMore, loading }) {
  const dispatch = useDispatch();
  console.log(data);
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <SetList
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      header={
        <>
          <div style={{ width: '20%', position: 'relative' }}>{header}</div>
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <EditButton onClick={onClickMore} loading={loading}>
              더 보기
            </EditButton>
          </div>
        </>
      }
      // loadMore={
      //   <div style={{ textAlign: 'center', margin: '10px 0' }}>
      //     <EditButton onClick={onClickMore} loading={loading}>
      //       더 보기
      //     </EditButton>
      //   </div>
      // }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key='stop' onClick={onCancel(item.id)} />]}
          >
            <Avatar src={item.image != null ? `${backUrl}/${item.image}` : ''}>
              {item.nickname[0]}
            </Avatar>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default FollowList;
