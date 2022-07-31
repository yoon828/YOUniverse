import React from 'react';
import LogComponent from './LogComponent';
import VideoComponent from './VideoComponent';
import './RoomPage.scss';
import { useHistory } from 'react-router-dom';

const RoomPage = () => {
  const history = useHistory();
  return (
    <div id="main">
      <div id="main_left">
        <VideoComponent props={history} />
      </div>
      <div id="main_right">
        <LogComponent />
      </div>
    </div>
  );
};
export default RoomPage;
