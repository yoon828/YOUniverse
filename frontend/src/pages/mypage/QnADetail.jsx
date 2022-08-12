import React, { useState, useEffect } from 'react';

import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth';

import { getQnA, deleteQnA } from 'api/qna';
import { transform, isTokenExpired } from 'common/functions/functions';
import './QnADetail.scss';

const QnADetail = () => {
  const [qna, setQnA] = useState({});
  const history = useHistory();
  const { questionId } = useParams();
  const { dispatch } = useDispatch();

  // 문의 삭제 함수
  const handleDelete = () => {
    if (window.confirm('해당 문의를 정말 삭제하시겠습니까?')) {
      deleteQnA(questionId)
        .then(({ data }) => {
          console.log(data);
          history.replace('/question');
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          if (isTokenExpired(response.data.message)) {
            dispatch(logout());
          } else {
            alert('에러가 발생하였습니다..ㅜㅜ');
          }
        });
    }
  };

  useEffect(() => {
    getQnA(questionId)
      .then(({ data }) => {
        setQnA(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="qna_detail page_container">
      <div className="button_container">
        <button onClick={() => handleDelete()}>삭제</button>
      </div>
      <div className="qna_detail_header">
        <span className="qna_detail_header gray">제목</span>
        <span>{qna.title}</span>
        <span className="line" />
        <span>{transform(qna.question_date)}</span>
        <span className="line" />
        <span>{qna.isAnswered ? '답변완료' : '답변대기'}</span>
      </div>
      <div className="qna_detail_content">
        <p>{qna.content}</p>
      </div>
      <div className="qna_detail_answer">
        {!!qna.isAnswered ? (
          <>
            <p className="gray">관리자 {transform(qna.answer_date)}</p>
            <p>{qna.answer}</p>
          </>
        ) : (
          <p>답변이 등록되기 전입니다.</p>
        )}
      </div>
      <div className="button_container">
        <Link to="/question">목록</Link>
      </div>
    </div>
  );
};

export default QnADetail;
