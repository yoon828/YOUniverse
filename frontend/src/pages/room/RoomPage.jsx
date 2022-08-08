import React, { useState } from 'react';
import LogComponent from './LogComponent';
import VideoComponent from './VideoComponent';
import './RoomPage.scss';
import { useHistory } from 'react-router-dom';

const RoomPage = () => {
  const history = useHistory();
  const [logList, setLogList] = useState([]);
  return (
    <div id="main">
      <div id="main_left">
        <VideoComponent
          props={history}
          logList={logList}
          setLogList={setLogList}
        />
      </div>
      <div id="main_right">
        <LogComponent logList={logList} />
      </div>
    </div>
  );
};
export default RoomPage;
