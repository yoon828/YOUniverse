import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth';

import { getHistoryList } from 'api/history';
import { isTokenExpired } from 'common/functions/functions';
import Page from 'modules/Pagination';

import './HistoryList.scss';

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  const { dispatch } = useDispatch();

  useEffect(() => {
    getHistoryList()
      .then(({ data }) => {
        console.log(data.data);
        setHistoryList(data.data);
      })
      .catch(({ response }) => {
        console.log(response.data.message);
        if (isTokenExpired(response.data.message)) {
          dispatch(logout());
        } else {
          alert('에러가 발생하였습니다..ㅜㅜ');
        }
      });
  }, []);

  return (
    <div className="history_list page_container">
      <h1>히스토리 내역</h1>
      <Page
        type="/history"
        headers={['모임 제목', '모임 일시', '방주인']}
        data={historyList}
        items={['roomName', 'date', 'hostName']}
      />
      <div className="astronaut">
        <img
          className="astronaut_img"
          src="/asset/img/mypage/profile/profile_4.png"
          alt="우주인"
        />
      </div>
    </div>
  );
};
export default HistoryList;
