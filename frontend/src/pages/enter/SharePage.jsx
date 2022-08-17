/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import ShareModule from 'modules/ShareModule';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';

import './SharePage.scss';

const Share = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myMainHeader(false));
  }, []);

  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  const storeName = useSelector((state) => state.user.value.name);
  return (
    <div className="share_wrap">
      <div className="main_logo">
        <Link to="/">
          <img src="asset/img/logo.png" alt="logo" className="logo_img" />
        </Link>
      </div>
      <div className="share">
        <div className="title">나의 Space 공유하기</div>
        <ShareModule />
        <Link
          to={`/room?id=${storeSessionId}&name=${storeName}`}
          className="next"
        >
          다음
        </Link>
        {/* <img src="asset/img/main/rocket.png" alt="로켓" className="rocket" /> */}
        <img src="asset/img/main/rocket.gif" alt="로켓" className="rocket" />
      </div>
    </div>
  );
};
export default Share;
