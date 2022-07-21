import React from 'react';
import { useParams } from 'react-router-dom';

const HistoryDetail = () => {
  const { historyId } = useParams();
  return (
    <div>
      히스토리 {historyId}번 상세 페이지
      <p>방주인: </p>
      <p>참여자: </p>
      <p>일시: </p>
      <p>로그</p>
    </div>
  );
};

export default HistoryDetail;
