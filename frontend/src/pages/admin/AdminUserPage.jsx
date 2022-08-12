import { getUserList } from 'api/admin';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import { Link } from 'react-router-dom';

import './AdminUserPage.scss';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);

  // email: 'cjswltjr159@naver.com';
  // imagePath: null;
  // name: '천지석';
  // sessionId: 'ITDA-1283954855';
  // uuid: '2350332360';

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
  const deleteUser = (uuid) => {
    //관리자가 회원 탈퇴 시키기
  };

  const dispatch = useDispatch();
  dispatch(myMainHeader(false));

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
                  <button className="btn" onClick={() => deleteUser(user.uuid)}>
                    삭제
                  </button>
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
