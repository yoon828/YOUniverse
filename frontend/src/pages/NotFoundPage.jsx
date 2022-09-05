import React from 'react';
import { useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  const dispatch = useDispatch();
  dispatch(myMainHeader(false));

  return (
    <div className="not">
      <img src="/asset/img/404.gif" alt="404페이지" />
    </div>
  );
};

export default NotFoundPage;
