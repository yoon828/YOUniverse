/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth';
import { setAccessToken, setRefreshToken } from 'common/functions/functions';
const CallBackPage = () => {
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const url = new URLSearchParams(search);

  const accessToken = url.get('accessToken');
  const refreshToken = url.get('refreshToken');

  useEffect(() => {
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(login());
    }
  }, [url, dispatch]);

  if (sessionStorage.getItem('isInvited') === 'yes') {
    history.replace(
      `/room?id=${localStorage.getItem('hostId')}&name=${localStorage.getItem(
        'hostName'
      )}`
    );
  } else {
    history.replace('/');
  }

  return (
    <>
      <h1>콜백 페이지</h1>
      <p>{accessToken}</p>
      <p>{refreshToken}</p>
    </>
  );
};
export default CallBackPage;
