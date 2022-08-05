import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerQnA } from 'api/qna';
import './QnAPage.scss';

const QnA = () => {
  const qnaTitle = useRef(null);
  const qnaContent = useRef(null);
  const { uuid } = useSelector((state) => state.user.value);
  const history = useHistory();

  const clearQnA = () => {
    clearInterval(qnaTitle.current);
    clearInterval(qnaContent.current);
  };

  const handleSubmit = () => {
    const payload = {
      title: qnaTitle.current.value,
      content: qnaContent.current.value,
      uuid: uuid
    };

    registerQnA(payload)
      .then(({ data }) => {
        alert('문의글이 등록되었습니다.');
        console.log(`/question/${data.data.id}`);
        history.push(`/question/${data.data.id}`);
        clearQnA();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancle = () => {
    if (
      window.confirm(
        '문의하기 페이지에서 나가시겠습니까?\n작성 사항이 저장되지 않습니다.'
      )
    ) {
      clearQnA();
      history.push('/');
    }
  };

  useEffect(() => {
    qnaTitle.current.focus();
  }, []);

  return (
    <div className="qna_page page_container">
      <h1 className="title">1:1 문의하기</h1>
      <div>
        <input ref={qnaTitle} type="text" placeholder="문의 제목" />
        <textarea
          ref={qnaContent}
          cols="30"
          rows="10"
          placeholder="문의 내용"
        />
        <button onClick={() => handleCancle()}>취소하기</button>
        <button onClick={() => handleSubmit()}>질문하기</button>
      </div>
    </div>
  );
};

export default QnA;
