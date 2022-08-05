import React from 'react';
import './LogComponent.scss';

const LogComponent = () => {
  return (
    <div className="log_wrap">
      <h3>로그창</h3>
      <div className="log">
        <ul id="log_list"></ul>
      </div>
    </div>
  );
};
export default LogComponent;
