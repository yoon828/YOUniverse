import React, { useRef, useEffect } from 'react';
import './OvVideo.scss';

const OpenViduVideoComponent = (props) => {
  // const [videoRef, setVideoRef] = useState(React.createRef());

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  useEffect(() => {
    if (props && !!videoRef1) {
      props.streamManager.addVideoElement(videoRef1.current);
    }
    if (props && !!videoRef2) {
      props.streamManager.addVideoElement(videoRef2.current);
    }
  }, [props]);

  return (
    <div id="ov">
      <video autoPlay={true} ref={videoRef1} />
      <div className="mouth">
        <video autoPlay={true} ref={videoRef2} />
      </div>
    </div>
  );
};
export default OpenViduVideoComponent;
