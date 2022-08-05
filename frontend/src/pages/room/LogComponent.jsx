import React, { useState, useEffect } from 'react';
import './LogComponent.scss';

const LogComponent = () => {
  const [fontSize, setFontSize] = useState(15);

  useEffect(() => {
    setLogFontSize(fontSize);
  }, []);

  const setLogFontSize = (size) => {
    const logs = document.querySelectorAll('.log_item');
    console.log(logs);
    for (let i = 0; i < logs.length; i++) {
      logs[i].style.fontSize = `${size}px`;
    }
  };
  const changeFont = (change) => {
    let size = fontSize + change;
    if (size < 10) size = 10;
    if (size > 40) size = 40;
    setFontSize(size);
    setLogFontSize(size);
  };

  return (
    <div className="log">
      <h3>로그창</h3>
      <div className="log_body">
        <ul id="log_list"></ul>
      </div>
      <div className="log_footer">
        <button className="font_btn" id="minus" onClick={() => changeFont(-3)}>
          가
        </button>
        <button className="font_btn" id="plus" onClick={() => changeFont(3)}>
          가
        </button>
      </div>
    </div>
  );
};
export default LogComponent;
