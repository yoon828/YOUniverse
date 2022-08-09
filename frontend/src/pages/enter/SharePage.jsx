import React from 'react';
import ShareModule from 'modules/ShareModule';
import { Link } from 'react-router-dom';

import './SharePage.scss';

const Share = () => {
  return (
    <div className="share">
      <h1>공유하기</h1>
      <ShareModule />
      <Link to="/room/:sessionId">다음</Link>
    </div>
  );
};
export default Share;
