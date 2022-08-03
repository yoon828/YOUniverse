import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getHistory } from 'api/history';

const HistoryDetail = () => {
  const { historyId } = useParams();
  const [history, setHistory] = useState({});

  const handleDownLoad = () => {
    console.log('다운로드됩니다~~');
  };

  useEffect(() => {
    getHistory(historyId)
      // 조회 성공
      .then(({ data }) => {
        setHistory(data.data);
      })

      // 조회 실패
      .catch((err) => {
        console.log(err);
        alert('오류가 발생했습니다. 메인페이지로 돌아갑니다');
        useHistory.history.replace('/');
      });
  }, []);

  return (
    <div>
      <p>모임제목: {history.roomName}</p>
      <p>방주인: {history.hostName}</p>
      <p>참여자: {history.participants}</p>
      <p>일시: {history.date}</p>
      <p>로그: {history.filePath}</p>
      <button onClick={handleDownLoad}>다운로드</button>
      <Link to="/history">목록</Link>
    </div>
  );
};

export default HistoryDetail;
