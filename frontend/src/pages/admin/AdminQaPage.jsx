import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import { Link } from 'react-router-dom';
import { transform } from '../../common/functions/functions';

import './AdminQaPage.scss';
import { getQAList } from 'api/admin';

const AdminQaPage = () => {
  const [qaList, setQaList] = useState([]);

  // answer: null;
  // answer_date: null;
  // content: 'sdsds';
  // id: 99;
  // isAnswered: false;
  // question_date: 1660246735000;
  // title: 'sdsd';
  // uuid: '2360271702';

  useEffect(() => {
    getQA();
  }, []);

  const getQA = () => {
    getQAList()
      .then(({ data }) => {
        console.log(data);
        setQaList(data.data);
      })
      .catch((err) => console.log(err));
  };

  const dispatch = useDispatch();
  dispatch(myMainHeader(false));

  return (
    <div className="admin_user">
      <h1>QA 목록</h1>
      <table className="user_list">
        <thead>
          <tr className="table_tr">
            <th id="num">번호</th>
            <th id="title">제목</th>
            <th id="date">문의날짜</th>
            <th id="answer">답변여부</th>
          </tr>
        </thead>
        <tbody>
          {qaList.map((qa, idx) => {
            return (
              <tr className="table_tr" key={idx}>
                <td>{idx}</td>
                <td>
                  <Link to={`/admin/qa/${qa.id}`}>{qa.title}</Link>
                </td>
                <td>{transform(qa.question_date)}</td>
                <td>{!!qa.isAnswered ? '완료' : '대기중'}</td>
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

export default AdminQaPage;
