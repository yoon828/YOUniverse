import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveToken } from 'redux/auth';

const CallBackPage = () => {
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const url = new URLSearchParams(search);

  const accessToken = url.get('accessToken');
  const refreshToken = url.get('refreshToken');

  useEffect(() => {
    if (accessToken && refreshToken) {
      dispatch(
        saveToken({ accessToken: accessToken, refreshToken: refreshToken })
      );
      history.replace('/');
      // 로그인 후 메인페이지로 이동
    }
  }, [url, dispatch, history]);

  return (
    <>
      <h1>콜백 페이지</h1>
      <p>{accessToken}</p>
      <p>{refreshToken}</p>
    </>
  );
};
export default CallBackPage;
