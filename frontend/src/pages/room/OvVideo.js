import React, { Component } from 'react';
import * as faceapi from 'face-api.js';

const MODEL_URL = process.env.PUBLIC_URL + '/models';

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
]);

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      let video = this.videoRef.current;
      this.props.streamManager.addVideoElement(video);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      let video = this.videoRef.current;
      this.props.streamManager.addVideoElement(video);
    }
  }
  handleVideoOnPlay = () => {
    setInterval(async () => {
      if (this.canvasRef && this.canvasRef.current) {
        this.canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          this.videoRef.current
        );
        const displaySize = {
          width: 281,
          height: 194
        };

        faceapi.matchDimensions(this.canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            this.videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        this.canvasRef &&
          this.canvasRef.current &&
          this.canvasRef.current.getContext('2d').clearRect(0, 0, 281, 194);
        this.canvasRef &&
          this.canvasRef.current &&
          faceapi.draw.drawDetections(
            this.canvasRef.current,
            resizedDetections
          );
        this.canvasRef &&
          this.canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(
            this.canvasRef.current,
            resizedDetections
          );
        this.canvasRef &&
          this.canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            this.canvasRef.current,
            resizedDetections
          );
      }
    }, 100);
  };
  render() {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
      >
        <video
          autoPlay={true}
          ref={this.videoRef}
          onPlay={this.handleVideoOnPlay}
          style={{ borderRadius: '10px' }}
        />
        <canvas ref={this.canvasRef} style={{ position: 'absolute' }} />
      </div>
    );
  }
}
