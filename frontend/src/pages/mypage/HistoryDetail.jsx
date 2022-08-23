/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';
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
        if (isTokenExpired(response.data.message)) {
          dispatch(logout());
        } else {
          alert('에러가 발생하였습니다..ㅜㅜ');
        }
      });
  }, []);

  return (
    <div className="page_container history_detail">
      <div className="history_detail_title">
        <h2 className="title">{historyItem.roomName}</h2>
      </div>
      <div className="history_detail_header">
        <div className="history_detail_header_item item_host">
          <span className="history_detail_header gray">방 주인</span>
          <span className="detail_content">{historyItem.hostName}</span>
        </div>
        <div className="history_detail_header_item item_partipants">
          <span className="line" />
          <span className="history_detail_header gray">참여자</span>
          <span className="detail_content">{historyItem.participants}</span>
        </div>
        <div className="history_detail_header_item item_date">
          <span className="line" />
          <span className="history_detail_header gray">모임 일시</span>
          <span className="detail_content">{transform(historyItem.date)}</span>
        </div>
      </div>
      <div className="history_detail_content">
        <div className="chat">
          {log ? (
            log.map((chat, index) => {
              return (
                <div key={index} className="chat_item">
                  <p>
                    <span className="chat_name">{chat.name}</span>{' '}
                    <span className="chat_time gray">
                      {transform(chat.chatTime, 'chat')}
                    </span>
                  </p>
                  <p>{chat.content}</p>
                </div>
              );
            })
          ) : (
            <p>저장된 로그 내용이 없습니다.</p>
          )}
        </div>
      </div>
      <div className="button_container">
        <Link to="/history">목록</Link>
      </div>
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

export default HistoryDetail;
