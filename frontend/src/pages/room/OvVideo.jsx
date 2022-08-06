import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';
import './OvVideo.scss';
import { connect, useSelector } from 'react-redux';
import { useState } from 'react';

const MODEL_URL = '/models';

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
]);

const OpenViduVideoComponent = (props) => {
  const videoRef1 = React.createRef();
  const videoRef2 = React.createRef();
  const canvasRef = React.createRef();
  const bigMouth = useSelector((state) => state.feature.value.bigMouth);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    console.log('======================================');
    console.log(props);
    console.log(videoRef1);
    console.log('--------------------------------------');
    setIsSpeaking(props);
  });

  useEffect(() => {
    if (props && !!videoRef1) {
      let video = videoRef1.current;
      props.streamManager.addVideoElement(video);
    }
    if (props && !!videoRef2) {
      let video = videoRef2.current;
      props.streamManager.addVideoElement(video);
    }
  }, []);

  useEffect(() => {
    if (bigMouth) {
      //mouth 기능 on
      handleVideoOnPlay();
      videoRef2.current.hidden = false;
    } else {
      videoRef2.current.hidden = true;
    }
  }, [bigMouth]);

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        // canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        //   videoRef1.current
        // );
        // const displaySize = {
        //   width: 281,
        //   height: 194
        // };
        // faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectSingleFace(
            videoRef1.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        const dets = detections?.landmarks.getMouth();
        if (dets && videoRef2.current) {
          videoRef2.current.style.left = 270 - dets[0].x + 'px';
          videoRef2.current.style.top = 220 - dets[0].y + 'px';
        }
      }
    }, 100);
  };

  return (
    <div
      id="ov"
      style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
    >
      <video
        autoPlay={true}
        ref={videoRef1}
        // onPlay={!bigMouth ? handleVideoOnPlay : null}
        className={`${isSpeaking ? '' : 'not-'}speaking`}
      />
      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
      {/* {bigMouth ? ( */}
      <div className="mouth">
        <video autoPlay={true} ref={videoRef2} />
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default OpenViduVideoComponent;
