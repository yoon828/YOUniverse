import React from 'react';
import ShareModule from 'modules/ShareModule';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './SharePage.scss';

const Share = () => {
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  console.log(storeSessionId);
  const storename = useSelector((state) => state.user.value.name);
  console.log(storename);
  return (
    <div className="share">
      <h1>공유하기</h1>
      <ShareModule />
      <Link to={`/room/${storeSessionId}/${storename}`}>다음</Link>
    </div>
  );
};
export default Share;
