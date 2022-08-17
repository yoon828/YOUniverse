/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/auth';
import { resetUser, insertUser } from 'redux/user';
import { myMainHeader } from 'redux/mainHeader';

import { deleteUser, getUser } from 'api/user';
import { isTokenExpired } from 'common/functions/functions';
import { List } from 'modules/ListModule';
import _ from 'lodash';

import './MyPage.scss';

const MyPage = () => {
  const dispatch = useDispatch();
  const { name, email, qnAList, shareRoomHistoryList } = useSelector(
    (state) => state.user.value
  );
  const [profileImg, setProfileImg] = useState('');

  // 회원 탈퇴 함수
  const onDeleteUser = () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      deleteUser()
        .then(() => {
          alert('탈퇴가 성공적으로 진행되었습니다. 로그인으로 이동합니다.');
          dispatch(logout());
          dispatch(resetUser());
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

  const randomProfile = () => {
    const randomIndex = Math.floor(Math.random() * 9) + 1;
    const randomImage = `/asset/img/mypage/profile/profile_${randomIndex}.png`;
    return randomImage;
  };

  useEffect(() => {
    dispatch(myMainHeader(true));
    setProfileImg(randomProfile());
    getUser()
      .then(({ data }) => {
        dispatch(insertUser(data.data));
      })
      .catch(({ response }) => {
        if (isTokenExpired(response.data.message)) {
          dispatch(logout());
        } else {
          alert('에러가 발생하였습니다..ㅜㅜ');
        }
      });
  }, []);

  return (
    <div className="my_page">
      <div className="profile">
        <div>
          <img src={profileImg} alt="" />
          <p>{name}</p>
          <p>{email}</p>
        </div>
        <button onClick={onDeleteUser}>회원탈퇴</button>
      </div>

      <div className="info">
        <div className="info_history item w100">
          <div>
            <h2>SPACE 히스토리</h2>
            {/* <button onClick={addHistory}>히스토리 임의 등록</button> */}
            <Link to="/history">더보기</Link>
          </div>
          {!_.isEmpty(shareRoomHistoryList) ? (
            <List
              type="/history"
              data={shareRoomHistoryList}
              items={['date', 'roomName', 'hostName']}
            />
          ) : (
            <ul>
              <span className="no_list">히스토리가 없습니다.</span>
            </ul>
          )}
        </div>

        <div className="info_qa item w100">
          <div>
            <h2>1:1 문의내역</h2>
            <Link to="/question">더보기</Link>
          </div>

          {!_.isEmpty(qnAList) ? (
            <List
              type="/question"
              data={qnAList}
              items={['question_date', 'title', 'isAnswered']}
            />
          ) : (
            <div>
              <ul>
                <span className="no_list">문의 내역이 없습니다.</span>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
