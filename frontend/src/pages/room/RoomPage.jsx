import React, { useState } from 'react';
import LogComponent from './LogComponent';
import VideoComponent from './VideoComponent';
import './RoomPage.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoomPage = () => {
  const history = useHistory();
  const [logList, setLogList] = useState([]);
  // 스토어 값 가져오기 - 서희
  const storeSessionId = useSelector((state) => state.user.value.sessionId);
  console.log(storeSessionId);
  const storename = useSelector((state) => state.user.value.name);
  console.log(storename);
  return (
    <div id="main">
      <div id="main_left">
        <VideoComponent
          props={history}
          logList={logList}
          setLogList={setLogList}
          storeSessionId={storeSessionId}
          storename={storename}
        />
      </div>
      <div id="main_right">
        <LogComponent logList={logList} />
      </div>
    </div>
  );
};
export default RoomPage;
