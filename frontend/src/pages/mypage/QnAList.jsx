import React, { useState, useEffect } from 'react';
import { getQnAList } from 'api/qna';
import Page from 'modules/Pagination';
import './QnAList.scss';

const QnAList = () => {
  const [qnaList, setQnAList] = useState([]);

  useEffect(() => {
    getQnAList()
      .then(({ data }) => {
        console.log(data.data);
        setQnAList(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="qna_list page_container">
      <h1 className="title">1:1 문의내역</h1>
      <Page
        type="/question"
        data={qnaList}
        items={['title', 'question_date', 'isAnswered']}
      />
    </div>
  );
};
export default QnAList;
