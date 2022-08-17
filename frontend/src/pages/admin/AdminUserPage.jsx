/* eslint-disable no-unused-vars */
import { getUserList, deleteUser, postAdmin, getAdmin } from 'api/admin';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import { Link } from 'react-router-dom';

import './AdminUserPage.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Paper
} from '@mui/material';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myMainHeader(true));
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    const { data } = await getUserList();

    if (data.success) {
      let _users = [...data.data];

      await Promise.all(
        data.data.map(async (user, idx) => {
          const admin = await getAdmin(user.uuid);
          user.isAdmin = admin.data.data;
          _users[idx].isAdmin = admin.data.data;
        })
      );
    }
    setUsers(data.data);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="admin_user">
      <h1>회원 목록</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>sessionId</TableCell>
              <TableCell>삭제</TableCell>
              <TableCell>관리자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((user, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{user.uuid}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.sessionId}</TableCell>
                  <TableCell>
                    <button
                      className="btn"
                      onClick={() => deleteUserApi(user.uuid)}
                    >
                      삭제
                    </button>
                  </TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <button className="btn btn_admin" disabled>
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                count={users.length}
                rowsPerPage={5}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <div className="btn_div">
        <Link to="/admin" className="btn">
          관리자 메인페이지로
        </Link>
      </div>
    </div>
  );
};

export default AdminUserPage;
