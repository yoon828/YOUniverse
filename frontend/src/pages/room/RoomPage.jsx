import React, { useState, useEffect } from 'react';
import LogComponent from './LogComponent';
import VideoComponent from './VideoComponent';
import ShareModule from 'modules/ShareModule';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './RoomPage.scss';

import { myMainHeader } from 'redux/mainHeader';
import { toggleModal } from 'redux/share';

const RoomPage = () => {
  const history = useHistory();
  const params = useLocation();
  const storeSessionId = params.search.split('=')[1].split('&')[0];

  const { shareModal } = useSelector((state) => state.share.value);
  const [logList, setLogList] = useState([]);
  const dispatch = useDispatch();

  // 스토어 값 가져오기 - 서희
  // const storeSessionId = useSelector((state) => state.user.value.sessionId);
  const userName = useSelector((state) => state.user.value.name);
  const storeName = useSelector((state) => state.user.value.name)
    ? userName
    : localStorage.getItem('guestName');
  console.log(storeName);

  useEffect(() => {
    dispatch(myMainHeader(false));
  }, []);
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
