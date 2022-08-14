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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  dispatch(myMainHeader(false));

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const test = getUserList()
      .then(({ data }) => {
        if (data.success === true) {
          let _users = [...data.data];
          console.log(data.data);
          data.data.map((user, idx) => {
            // let flag = await Promise.all(getAdminApi(user.uuid));
            // console.log(flag);
            // _users[idx].isAdmin = flag;
          });
          console.log(_users);
          setUsers(data.data);
          return true;
        } else return false;
      })
      .catch((err) => console.log(err));
    return test;
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
    // console.log(uuid);
    const data = getAdmin(uuid);
    return data;
    console.log(data);
    // getAdmin(uuid)
    //   .then(({ data }) => {
    //     console.log(data);
    //     return data.success;
    //     // if (data.success === true) {
    //     //   console.log(uuid + '관리자임');
    //     //   return true;
    //     // } else {
    //     //   console.log(uuid + '관리자 아님');
    //     //   return false;
    //     // }
    //   })
    //   .catch((err) => console.log(err + '에러가 발생했습니다.'));
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
                    {/* {getAdminApi(user.uuid) ? (
                      <button
                        className="btn_admin"
                        onClick={() => postAdminApi(user.uuid)}
                        disabled
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
                    )} */}
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
