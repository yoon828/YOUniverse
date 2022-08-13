import React, { useState, useEffect, useRef } from 'react';

import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth';

import { getQnA, deleteQnA, postQaAnswer } from 'api/qna';
import { transform, isTokenExpired } from 'common/functions/functions';
import './AdminQaDetailPage.scss';

const QnADetail = () => {
  const [qna, setQnA] = useState({});
  const history = useHistory();
  const params = useParams();
  const { questionId } = useParams();
  const { dispatch } = useDispatch();
  const answer = useRef();

  useEffect(() => {
    getQADetail();
    console.log(params);
  }, []);

  const getQADetail = () => {
    getQnA(questionId)
      .then(({ data }) => {
        setQnA(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 문의 삭제 함수
  const handleSubmit = () => {};

  const postAnswer = () => {
    postQaAnswer(answer)
      .then(({ data }) => {
        console.log('답변을 등록했습니다');
        getQADetail();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="qna_detail page_container">
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
            <div>
              <form>
                <textarea
                  ref={answer}
                  rows="4"
                  placeholder="문의 답변을 입력해주세요"
                  required
                />
              </form>
              <div className="button_container">
                <button type="button" onClick={() => postAnswer()}>
                  등록
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="button_container">
          <Link to="/question">목록</Link>
        </div>
      </div>
    </>
  );
};

export default QnADetail;
