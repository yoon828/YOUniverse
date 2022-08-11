import React from 'react';
import ShareModule from 'modules/ShareModule';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './SharePage.scss';

const Share = () => {
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  console.log(storeSessionId);
  const storeName = useSelector((state) => state.user.value.name);
  console.log(storeName);
  return (
    <div className="share">
      <h1>공유하기</h1>
      <ShareModule />
      <Link to={`/room?id=${storeSessionId}&name=${storeName}`}>다음</Link>
    </div>
  );
};
export default Share;
