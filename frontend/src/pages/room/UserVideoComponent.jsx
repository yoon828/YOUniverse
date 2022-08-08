/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import '../room/VideoComponent.scss';

const UserVideoComponent = (props) => {
  const [nickname, setNickname] = useState('');
  const icons = ['diamond', 'heart', 'round', 'square', 'star', 'triangle'];

  useEffect(() => {
    setNickname(
      JSON.parse(props.streamManager.stream.connection.data).clientData
    );
  }, []);

  return (
    <div className="stream">
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent
            streamManager={props.streamManager}
            speaker={props.speaker}
          />
          <div className="stream-text">
            <img
              width={20}
              src={`/asset/img/${icons[props.icon]}.png`}
              alt={icons[props.icon]}
            />
            <span>{nickname}</span>
            {props.isCC && (
              <span
                id={`subtitle_${props.connectionId}`}
                className="subtitle"
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;