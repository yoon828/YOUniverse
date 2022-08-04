/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import OpenViduVideoComponent from './OvVideo';
import '../room/VideoComponent.scss';

const UserVideoComponent = (props) => {
  useEffect(() => {
    console.log('change');
  }, [props]);
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  const getSubtitle = () => {
    console.log(props);
    return props.subtitle;
  };
  const getTest = () => {
    console.log(getNicknameTag() === props.talker);
    if (getNicknameTag() === props.talker) return true;
    else return false;
  };

  return (
    <div className="stream">
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className="stream-text">
            <span>{getNicknameTag()}</span>
            <span id={getNicknameTag()} className="subtitle">
              {getTest() ? getSubtitle() : null}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
