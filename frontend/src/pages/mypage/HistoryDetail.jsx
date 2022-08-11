import React, { useState, useEffect } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth';

import { getHistory, getLog } from 'api/history';
import { transform, isTokenExpired } from 'common/functions/functions';
import './HistoryDetail.scss';

const HistoryDetail = () => {
  const [historyItem, setHistoryItem] = useState({});
  const [log, setLog] = useState(null);
  const { historyId } = useParams();
  const { dispatch } = useDispatch();

  const isLogId = (logId) => !!logId;
  const fetchLog = (logId) => {
    getLog(logId)
      .then(({ data }) => {
        console.log(data.data.chats);
        setLog(data.data.chats);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getHistory(historyId)
      // 조회 성공
      .then(({ data }) => {
        setHistoryItem(data.data);
        if (isLogId(data.data.logId)) {
          fetchLog(data.data.logId);
        }
      })
      // 조회 실패
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
    <div className="page_container history_detail">
      <div className="history_detail_header">
        <h2 className="title">{historyItem.roomName}</h2>
      </div>
      <div className="content">
        <div className="outline">
          <p>
            <span>방주인</span>
            <span>{historyItem.hostName}</span>
          </p>
          <p>
            <span>참여자</span>
            <span>{historyItem.participants?.slice(1)}</span>
          </p>
          <p>
            <span>일시</span>
            <span>{transform(historyItem.date)}</span>
          </p>
        </div>
        <div className="log">
          로그:{' '}
          {log ? (
            log.map((chat, index) => {
              return (
                <div key={index}>
                  <span>{chat.name}</span>
                  <span>{transform(chat.chatTime, 'chat')}</span>
                  <p>{chat.content}</p>
                </div>
              );
            })
          ) : (
            <p>저장된 로그 내용이 없습니다.</p>
          )}
        </div>
      </div>
      {/* <button onClick={addLog}>로그임시등록</button> */}
      <Link to="/history">목록</Link>
    </div>
  );
};

export default HistoryDetail;
