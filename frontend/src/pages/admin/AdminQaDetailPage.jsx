/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';

import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';

import { getQnA } from 'api/qna';
import { postQaAnswer, putQaAnswer, deleteQaAnswer } from 'api/admin';
import { transform } from 'common/functions/functions';
import './AdminQaDetailPage.scss';

const QnADetail = () => {
  const [qna, setQnA] = useState({});
  const [mode, setMode] = useState(0); //0이면 답변 대기, 1이면 답변 완료, 2면 수정 모드
  const { questionId } = useParams();
  const answer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myMainHeader(true));
    getQADetail();
  }, []);

  const getQADetail = () => {
    getQnA(questionId)
      .then(({ data }) => {
        console.log(data.data);
        setQnA(data.data);
        if (data.data.isAnswered) {
          setMode(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postAnswer = () => {
    console.log(qna);
    postQaAnswer({ id: qna.id, answer: answer.current.value, uuid: qna.uuid })
      .then(({ data }) => {
        if (data.success === true) {
          alert('답변을 등록했습니다');
          getQADetail();
        } else {
          console.log('에러가 발생했습니다');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const putQaAnswerApi = () => {
    putQaAnswer({ id: qna.id, answer: answer.current.value, uuid: qna.uuid })
      .then(({ data }) => {
        if (data.success === true) {
          alert('답변을 수정했습니다');
          getQADetail();
        } else {
          console.log('에러가 발생했습니다');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteQaAnswerApi = () => {
    if (window.confirm('답변을 삭제하시겠습니까?')) {
      deleteQaAnswer(qna.id)
        .then(({ data }) => {
          console.log(data);
          if (data.success === true) {
            alert('답변을 삭제했습니다');
            getQADetail();
            setMode(0);
          } else {
            console.log('에러가 발생했습니다');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
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
        {mode === 0 ? (
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
        ) : mode === 1 ? (
          <div>
            <div>
              <p className="gray">관리자 {transform(qna.answer_date)}</p>
              <p>{qna.answer}</p>
            </div>
            <div>
              <button type="button" onClick={() => setMode(2)}>
                수정
              </button>
              <button type="button" onClick={() => deleteQaAnswerApi()}>
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div>
            <form>
              <textarea
                ref={answer}
                rows="4"
                required
                defaultValue={qna.answer}
              />
            </form>
            <div className="button_container">
              <button type="button" onClick={() => putQaAnswerApi()}>
                수정하기
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="button_container">
        <Link to="/admin/qa">목록</Link>
      </div>
    </div>
  );
};

export default QnADetail;
