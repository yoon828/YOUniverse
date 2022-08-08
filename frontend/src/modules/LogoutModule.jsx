import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth';
import { resetUser } from 'redux/user';

const LogoutModule = () => {
  const dispatch = useDispatch();
  const deleteUser = () => {
    dispatch(logout());
    dispatch(resetUser());
  };
  return (
    <div className="logout_box">
      <button className="logout_button" onClick={deleteUser}>
        로그아웃
      </button>
    </div>
  );
};
export default LogoutModule;
