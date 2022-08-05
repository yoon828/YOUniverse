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

  return (
    <div className="stream">
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className="stream-text">
            <span>{nickname}</span>
            {props.isCC && (
              <span id={`subtitle_${nickname}`} className="subtitle"></span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
