import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getHistory } from 'api/history';
import { transform } from 'common/functions/functions';
import './HistoryDetail.scss';
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
      <div>
        <h2 className="title">{historyItem.roomName}</h2>
        <button onClick={handleDownLoad}>다운로드</button>
      </div>
      <div className="content">
        <div className="outline">
          <p>
            <span>방주인</span>
            <span>{historyItem.hostName}</span>
          </p>
          <p>
            <span>참여자</span>
            <span>{historyItem.participants}</span>
          </p>
          <p>
            <span>일시</span>
            <span>{transform(historyItem.date)}</span>
          </p>
        </div>
        <p className="log">로그: {historyItem.filePath}</p>
      </div>

      <Link to="/history">목록</Link>
    </div>
  );
};

export default HistoryDetail;
