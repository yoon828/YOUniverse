import { getUserList, deleteUser, postAdmin, getAdmin } from 'api/admin';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import { Link } from 'react-router-dom';

import './AdminUserPage.scss';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  dispatch(myMainHeader(false));

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    getUserList()
      .then(({ data }) => {
        console.log(data);
        setUsers(() => data.data);
      })
      .catch((err) => console.log(err));
  };

  //회원 탈퇴
  const deleteUserApi = (uuid) => {
    if (window.confirm('정말로 탈퇴시키겠습니까?')) {
      //관리자가 회원 탈퇴 시키기
      deleteUser(uuid)
        .then(({ data }) => {
          if (data.success === true) {
            alert('탈퇴 완료');
            getUsers();
          }
        })
        .catch((err) => console.log(err + '탈퇴 중 오류 발생했습니다'));
    }
  };

  //관리자 등록
  const postAdminApi = (uuid) => {
    if (window.confirm('관리자 등록하시겠습니까?')) {
      //관리자 등록하기
      postAdmin(uuid)
        .then(({ data }) => {
          if (data.success === true) {
            alert('관리자로 등록했습니다.');
            getUsers();
          }
        })
        .catch((err) => console.log(err + '오류가 발생했습니다'));
    }
  };
  //관리자 확인
  const getAdminApi = (uuid) => {
    getAdmin(uuid)
      .then(({ data }) => {
        if (data.success === true) return true;
        else return false;
      })
      .catch((err) => console.log(err + '에러가 발생했습니다.'));
  };

  return (
    <div className="admin_user">
      <h1>회원 목록</h1>
      <table className="user_list">
        <thead>
          <tr className="table_tr">
            <th>이름</th>
            <th>이메일</th>
            <th>sessionId</th>
            <th>삭제</th>
            <th>관리자</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            return (
              <tr className="table_tr" key={idx}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.sessionId}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteUserApi(user.uuid)}
                  >
                    삭제
                  </button>
                </td>
                <td>
                  {getAdminApi(user.uuid) ? (
                    <button
                      className="btn_admin"
                      onClick={() => postAdminApi(user.uuid)}
                    >
                      완료
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => postAdminApi(user.uuid)}
                    >
                      등록
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn_div">
        <Link to="/admin" className="btn">
          관리자 메인페이지로
        </Link>
      </div>
    </div>
  );
};

export default AdminUserPage;
