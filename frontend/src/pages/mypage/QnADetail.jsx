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
          history.replace('/question');
        })
        .catch(({ response }) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [questionId]);

  return (
    <div className="qna_detail page_container">
      <div className="qna_detail_header">
        <div className="qna_detail_header_item">
          <span className="gray">제목</span>
          <span className="detail_content">{qna.title}</span>
        </div>
        <div className="qna_detail_header_item">
          <span className="line" />
          <span className="detail_content">{transform(qna.question_date)}</span>
        </div>
        <div className="qna_detail_header_item">
          <span className="line" />
          <span className="detail_content">
            {qna.isAnswered ? '답변완료' : '답변대기'}
          </span>
        </div>
      </div>
      <div className="qna_detail_content">{qna.content}</div>
      <div className="qna_detail_answer">
        {!!qna.isAnswered ? (
          <>
            <p className="gray admin_answer">
              관리자 {transform(qna.answer_date)}
            </p>
            <p>{qna.answer}</p>
          </>
        ) : (
          <p>답변이 등록되기 전입니다.</p>
        )}
      </div>
      <div className="button_container">
        <button onClick={() => handleDelete()} className="btn_mg">
          삭제
        </button>
        <Link to="/question">목록</Link>
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

export default QnADetail;
