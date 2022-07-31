import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteToken } from 'redux/auth';

const LogoutModule = () => {
  const dispatch = useDispatch();
  const deleteUser = () => {
    console.log('check');
    console.log(dispatch(deleteToken));
    dispatch(deleteToken({ accessToken: '', refreshToken: '' }));
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
