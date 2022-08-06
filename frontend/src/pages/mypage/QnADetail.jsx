import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getQnA, deleteQnA } from 'api/qna';
import { transform } from 'common/functions/functions';
import './QnADetail.scss';

const QnADetail = () => {
  const history = useHistory();
  const { questionId } = useParams();
  const [qna, setQnA] = useState({});

  // 문의 삭제 함수
  const handleDelete = () => {
    if (window.confirm('해당 문의를 정말 삭제하시겠습니까?')) {
      deleteQnA(questionId)
        .then(({ data }) => {
          console.log(data);
          history.replace('/question');
        })
        .catch((err) => {
          console.log(err);
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
      <h1 className="title">{qna.title}</h1>
      {/* <p>제목: {qna.title}</p> */}
      <button onClick={() => handleDelete()}>삭제</button>

      <p>(문의날짜) {transform(qna.question_date)}</p>
      <p>(진행상황) {qna.isAnswered ? '답변완료' : '답변대기'}</p>
      <p>내용: {qna.content}</p>
      {!!qna.isAnswered ? (
        <>
          <p>(답변날짜) {qna.answer_date}</p>
          <p>(답변내용) {qna.answer}</p>
        </>
      ) : null}

      <Link to="/question">목록</Link>
    </div>
  );
};

export default QnADetail;
