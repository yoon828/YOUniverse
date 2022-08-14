import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import './AdminPage.scss';

const AdminPage = () => {
  const dispatch = useDispatch();

  dispatch(myMainHeader(false));
  return (
    <div className="admin_page">
      <Link to="/admin/users" className="admin_menu">
        회원 관리
      </Link>
      <Link to="/admin/qa" className="admin_menu">
        문의 관리
      </Link>
    </div>
  );
};

export default AdminPage;
