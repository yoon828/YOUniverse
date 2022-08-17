import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth';
import { resetUser } from 'redux/user';
import { logoutUser } from 'api/auth';

const LogoutModule = () => {
  const dispatch = useDispatch();
  const deleteUser = () => {
    logoutUser()
      .then(({ data }) => {
        dispatch(logout());
        dispatch(resetUser());
      })
      .catch(({ response }) => {
        console.log(response);
      });
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
