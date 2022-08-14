import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth';

import { getQnAList } from 'api/qna';
import { isTokenExpired } from 'common/functions/functions';
import Page from 'modules/Pagination';

import './QnAList.scss';

const QnAList = () => {
  const [qnaList, setQnAList] = useState([]);
  const { dispatch } = useDispatch();

  useEffect(() => {
    getQnAList()
      .then(({ data }) => {
        console.log(data.data);
        setQnAList(data.data);
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
    <div className="qna_list page_container">
      <h1 className="title">1:1 문의내역</h1>
      <Page
        type="/question"
        headers={['문의 제목', '문의 일시', '진행 상황']}
        data={qnaList}
        items={['title', 'question_date', 'isAnswered']}
      />
    </div>
  );
};
export default QnAList;
