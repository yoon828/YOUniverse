import React, { useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/auth';
import { myMainHeader } from 'redux/mainHeader';

import { registerQnA } from 'api/qna';
import { isTokenExpired } from 'common/functions/functions';

import './QnAPage.scss';

const QnA = () => {
  const qnaTitle = useRef(null);
  const qnaContent = useRef(null);
  const history = useHistory();
  const { uuid } = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  dispatch(myMainHeader(true));

  const clearQnA = () => {
    clearInterval(qnaTitle.current);
    clearInterval(qnaContent.current);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = qnaTitle.current.value.trim();
    const content = qnaContent.current.value.trim();

    if (!!title && !!content) {
      const payload = {
        title: title,
        content: qnaContent.current.value,
        uuid: uuid
      };

      registerQnA(payload)
        .then(({ data }) => {
          alert('문의글이 등록되었습니다.');
          history.push(`/question/${data.data.id}`);
          clearQnA();
        })
        .catch(({ response }) => {
          if (isTokenExpired(response.data.message)) {
            dispatch(logout());
          } else {
            alert('에러가 발생하였습니다..ㅜㅜ');
          }
        });
    } else if (!title) {
      alert('제목을 작성해주세요.');
      qnaTitle.current.value = '';
    } else if (!content) {
      alert('내용을 작성해주세요.');
      qnaContent.current.value = '';
    }
  };

  const handleCancle = (event) => {
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
      <h1 className="title" aria-label="일대일 문의하기">
        1:1 문의하기
      </h1>
      <div className="w100">
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            ref={qnaTitle}
            type="text"
            placeholder="문의 제목을 입력해주세요"
            required
          />
          <textarea
            ref={qnaContent}
            rows="6"
            placeholder="문의 내용을 입력해주세요"
            required
          />
          <div className="button_container">
            <button type="submit">등록</button>
            <button type="button" onClick={() => handleCancle()}>
              취소
            </button>
          </div>
        </form>
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

export default QnA;
