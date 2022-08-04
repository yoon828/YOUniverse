/* eslint-disable react/destructuring-assignment */
import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import '../room/VideoComponent.scss';

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  const getSubtitle = () => {
    return props.subtitle;
  };

  return (
    <div className="stream">
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className="stream-text">
            <span>{getNicknameTag()}</span>
            <span id={getNicknameTag()} className="subtitle">
              {getSubtitle()}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
