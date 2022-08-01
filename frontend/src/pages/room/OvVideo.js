import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import './OvVideo.scss';

const MODEL_URL = '/models';

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
]);

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef1 = React.createRef();
    this.videoRef2 = React.createRef();
    this.canvasRef = React.createRef();
    this.x = 0;
    this.y = 0;
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef1) {
      let video = this.videoRef1.current;
      this.props.streamManager.addVideoElement(video);
    }
    if (props && !!this.videoRef2) {
      let video = this.videoRef2.current;
      this.props.streamManager.addVideoElement(video);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef1) {
      let video = this.videoRef1.current;
      this.props.streamManager.addVideoElement(video);
    }
    if (this.props && !!this.videoRef2) {
      let video = this.videoRef2.current;
      this.props.streamManager.addVideoElement(video);
    }
  }
  handleVideoOnPlay = () => {
    setInterval(async () => {
      if (this.canvasRef && this.canvasRef.current) {
        this.canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          this.videoRef1.current
        );
        const displaySize = {
          width: 281,
          height: 194
        };

        faceapi.matchDimensions(this.canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            this.videoRef1.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();
        // .withFaceExpressions();

        // const resizedDetections = faceapi.resizeResults(
        //   detections,
        //   displaySize
        // );

        const dets = detections[0]?.landmarks.getMouth();
        if (dets) {
          console.log(dets);
          this.videoRef2.current.style.left = 270 - dets[0].x + 'px';
          this.videoRef2.current.style.top = 220 - dets[0].y + 'px';
        }

        this.canvasRef &&
          this.canvasRef.current &&
          this.canvasRef.current.getContext('2d').clearRect(0, 0, 281, 194);

        // this.canvasRef &&
        //   this.canvasRef.current &&
        //   faceapi.draw.drawDetections(
        //     this.canvasRef.current,
        //     resizedDetections
        //   );

        // this.canvasRef &&
        //   this.canvasRef.current &&
        //   faceapi.draw.drawFaceLandmarks(
        //     this.canvasRef.current,
        //     resizedDetections
        //   );

        // this.canvasRef &&
        //   this.canvasRef.current &&
        //   faceapi.draw.drawFaceExpressions(
        //     this.canvasRef.current,
        //     resizedDetections
        //   );
      }
    }, 10);
  };
  render() {
    return (
      <div
        id="ov"
        style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
      >
        <video
          autoPlay={true}
          ref={this.videoRef1}
          onPlay={this.handleVideoOnPlay}
          style={{ borderRadius: '10px' }}
        />
        <canvas ref={this.canvasRef} style={{ position: 'absolute' }} />
        <div className="mouth">
          <video autoPlay={true} ref={this.videoRef2} />
        </div>
      </div>
    );
  }
}
