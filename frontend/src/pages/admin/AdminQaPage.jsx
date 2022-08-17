/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import { Link } from 'react-router-dom';
import { transform } from '../../common/functions/functions';

import './AdminQaPage.scss';
import { getQAList } from 'api/admin';

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

const AdminQaPage = () => {
  const [qaList, setQaList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(6);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myMainHeader(true));
    getQA();
  }, []);

  const getQA = () => {
    getQAList()
      .then(({ data }) => {
        setQaList(data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="admin_user">
      <h1>QA 목록</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>문의날짜</TableCell>
              <TableCell>답변여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? qaList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : qaList
            ).map((qa, idx) => {
              return (
                <TableRow className="table_tr" key={idx}>
                  <TableCell>{qa.id}</TableCell>
                  <TableCell>
                    <Link to={`/admin/qa/${qa.id}`}>{qa.title}</Link>
                  </TableCell>
                  <TableCell>{transform(qa.question_date)}</TableCell>
                  <TableCell>{!!qa.isAnswered ? '완료' : '대기중'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[6]}
                count={qaList.length}
                rowsPerPage={6}
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

export default AdminQaPage;
