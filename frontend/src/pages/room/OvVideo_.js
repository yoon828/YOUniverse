import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import './OvVideo.scss';
import { connect } from 'react-redux';

const MODEL_URL = '/models';

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
]);

class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef1 = React.createRef();
    this.videoRef2 = React.createRef();
    this.canvasRef = React.createRef();
    this.x = 0;
    this.y = 0;
    this.getMouth = this.getMouth.bind(this);
  }

  componentDidUpdate(props) {
    console.log(props);
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
          .detectSingleFace(
            this.videoRef1.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        const dets = detections?.landmarks.getMouth();
        if (dets) {
          this.videoRef2.current.style.left = 270 - dets[0].x + 'px';
          this.videoRef2.current.style.top = 220 - dets[0].y + 'px';
        }
      }
    }, 10);
  };

  getMouth() {
    console.log(this.props);
    // return this.props.bigMouth;
  }
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
        {this.getMouth() ? (
          <div className="mouth">
            <video autoPlay={true} ref={this.videoRef2} />
          </div>
        ) : null}
        );
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    bigMouth: state.feature.value.bigMouth
  };
}
export default connect(mapStateToProps)(OpenViduVideoComponent);
