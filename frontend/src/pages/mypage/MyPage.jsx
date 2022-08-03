import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getUser } from 'api/user';
import { storeHistory } from 'api/history';
import { deleteToken } from 'redux/auth';
import { resetUser, insertUser } from 'redux/user';
import { List } from 'modules/ListModule';
import _ from 'lodash';
import './MyPage.scss';

const MyPage = () => {
  const dispatch = useDispatch();
  const { name, email, uuid, qnAList, shareRoomHistoryList } = useSelector(
    (state) => state.user.value
  );

  // 회원 탈퇴 함수
  const onDeleteUser = () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      deleteUser()
        .then(() => {
          alert('탈퇴가 성공적으로 진행되었습니다. 로그인으로 이동합니다.');
          dispatch(deleteToken());
          dispatch(resetUser());
        })
        .catch((err) => console.log('err', err));
    }
  };

  // 히스토리 테스트용 임의 등록 함수
  const addHistory = () => {
    const content = {
      filePath: '로컬어딘가겠지',
      hostName: name,
      participants: '최싸피,박싸피,집싸피',
      roomName: '싸피모임',
      uuid: uuid
    };
    storeHistory(content)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  };

  useEffect(() => {
    getUser()
      .then(({ data }) => {
        console.log(data);
        dispatch(insertUser(data.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my_page">
      <div className="box">
        <p>{name}님의 마이페이지</p>
        <p>{email}</p>
        <button onClick={onDeleteUser}>회원탈퇴</button>
      </div>

      <div className="box">
        <div>
          <h2>쉐어룸 히스토리</h2>
          <button onClick={addHistory}>히스토리 임의 등록</button>
          <Link to="/history">더보기</Link>
          {!_.isEmpty(shareRoomHistoryList) ? (
            <List
              type="/history"
              data={shareRoomHistoryList}
              items={['date', 'roomName', 'hostName']}
            />
          ) : null}
        </div>

        <div>
          <h2>1:1 문의내역</h2>
          <Link to="/question">더보기</Link>
          {!_.isEmpty(qnAList) ? (
            <List
              type="/question"
              data={qnAList}
              items={['question_date', 'title']}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
