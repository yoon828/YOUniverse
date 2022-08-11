import React from 'react';
import ShareModule from 'modules/ShareModule';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { myMainHeader } from 'redux/mainHeader';

import './SharePage.scss';

const Share = () => {
  const dispatch = useDispatch();
  dispatch(myMainHeader(false));
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  console.log(storeSessionId);
  const storeName = useSelector((state) => state.user.value.name);
  console.log(storeName);
  return (
    <div className="share_page">
      <div className="main_logo">
        <Link to="/">
          <img
            src="https://blog.kakaocdn.net/dn/be0xab/btrHTW8GtRk/LDOhwqWEBUDFkVh1S5aNv0/img.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="share">
        <h1>공유하기</h1>
        <ShareModule />
        <Link to={`/room?id=${storeSessionId}&name=${storeName}`}>다음</Link>
      </div>
    </div>
  );
};
export default Share;
