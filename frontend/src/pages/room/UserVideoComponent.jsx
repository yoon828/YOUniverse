/* eslint-disable react/destructuring-assignment */
import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import '../room/VideoComponent.scss';

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  return (
    <div className="stream">
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className="stream-text">
            <span>{getNicknameTag()}</span>
            <span id={getNicknameTag()} className="subtitle">
              subtitle
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
