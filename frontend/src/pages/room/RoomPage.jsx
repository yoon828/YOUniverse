import React, { useState } from 'react';
import LogComponent from './LogComponent';
import VideoComponent from './VideoComponent';
import ShareModule from 'modules/ShareModule';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './RoomPage.scss';

import { toggleModal } from 'redux/share';

const RoomPage = () => {
  const history = useHistory();
  const { shareModal } = useSelector((state) => state.share.value);
  const [logList, setLogList] = useState([]);
  const dispatch = useDispatch();

  // 스토어 값 가져오기 - 서희
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  console.log(storeSessionId);
  const userName = useSelector((state) => state.user.value.name);
  const storeName = useSelector((state) => state.user.value.name)
    ? userName
    : localStorage.getItem('guestName');
  console.log(storeName);
  return (
    <div id="main">
      {shareModal ? (
        <div className="modal">
          <h1>공유하기</h1>
          <ShareModule />
          <button onClick={() => dispatch(toggleModal())}>닫기</button>
        </div>
      ) : null}
      <div id="main_left">
        {storeName ? (
          <VideoComponent
            props={history}
            logList={logList}
            setLogList={setLogList}
            storeSessionId={storeSessionId}
            storeName={storeName}
          />
        ) : null}
      </div>
      <div id="main_right">
        <LogComponent logList={logList} />
      </div>
    </div>
  );
};
export default RoomPage;
