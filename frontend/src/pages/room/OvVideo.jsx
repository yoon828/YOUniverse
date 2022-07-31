import React, { useRef, useEffect } from 'react';

const OpenViduVideoComponent = (props) => {
  // const [videoRef, setVideoRef] = useState(React.createRef());

  const videoRef = useRef(null);
  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  return <video autoPlay={true} ref={videoRef} />;
};
export default OpenViduVideoComponent;
