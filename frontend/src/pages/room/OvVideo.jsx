/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';
import './OvVideo.scss';
import { useSelector } from 'react-redux';
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
  // eslint-disable-next-line no-unused-vars
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    let videoName = videoRef1.current.id;
    let speaker = props.speaker;
    if (videoName === 'local-video-undefined') {
      setIsSpeaking(
        props.streamManager.stream.connection.connectionId === speaker
      );
    } else {
      setIsSpeaking(videoName.includes(speaker));
    }
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
        const detections = await faceapi
          .detectSingleFace(
            videoRef1.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        const dets = detections?.landmarks.getMouth();
        if (dets && videoRef2.current) {
          videoRef2.current.style.left = 270 - dets[0].x + 'px';
          videoRef2.current.style.top = 160 - dets[0].y + 'px';
        }
      }
    }, 100);
  };

  return (
    <div id="ov">
      <video
        autoPlay={true}
        ref={videoRef1}
        className={props.streamManager.stream.connection.connectionId}
      />
      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
      <div className="mouth">
        <video autoPlay={true} ref={videoRef2} />
      </div>
    </div>
  );
};

export default OpenViduVideoComponent;
