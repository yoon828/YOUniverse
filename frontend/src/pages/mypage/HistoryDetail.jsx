import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getHistory } from 'api/history';
import { transform } from 'common/functions/functions';

const HistoryDetail = () => {
  const { historyId } = useParams();
  const [historyItem, setHistoryItem] = useState({});
  const history = useHistory();

  const handleDownLoad = () => {
    console.log('다운로드됩니다~~');
  };

  useEffect(() => {
    getHistory(historyId)
      // 조회 성공
      .then(({ data }) => {
        setHistoryItem(data.data);
      })

      // 조회 실패
      .catch((err) => {
        console.log(err);
        alert('오류가 발생했습니다. 메인페이지로 돌아갑니다');
        // history.replace('/');
      });
  }, []);

  return (
    <div className="page_container history_detail">
      <p className="title">모임제목: {history.roomName}</p>
      <p>방주인: {historyItem.hostName}</p>
      <p>참여자: {historyItem.participants}</p>
      <p>일시: {transform(historyItem.date)}</p>
      <p>로그: {historyItem.filePath}</p>
      <button onClick={handleDownLoad}>다운로드</button>
      <Link to="/history">목록</Link>
    </div>
  );
};

export default HistoryDetail;
