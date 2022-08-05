/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import '../room/VideoComponent.scss';

const UserVideoComponent = (props) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    console.log(props);
    setNickname(
      JSON.parse(props.streamManager.stream.connection.data).clientData
    );
  }, []);

  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   return JSON.parse(props.streamManager.stream.connection.data).clientData;
  // };

  const getSubtitle = () => {
    console.log(props);
    return props.subtitle;
  };
  const getTest = () => {
    console.log(nickname === props.talker);
    if (nickname === props.talker) return true;
    else return false;
  };

  return (
    <div className="stream">
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className="stream-text">
            <span>{nickname}</span>
            <span id={`subtitle_${nickname}`} className="subtitle">
              {/* {getTest() ? getSubtitle() : null} */}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
