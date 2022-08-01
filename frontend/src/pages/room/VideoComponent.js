/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import './VideoComponent.scss';
import CCImg from '../../asset/img/cc.png';
import SoundImg from '../../asset/img/sound.png';
import MouthImg from '../../asset/img/mouth.png';
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Logout,
  Share
} from '@mui/icons-material';

// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_URL = 'https://cjswltjr.shop';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
const recognition = new window.webkitSpeechRecognition();
// true면 음절을 연속적으로 인식하나 false면 한 음절만 기록함
recognition.interimResults = true;
// 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
recognition.lang = "ko-KR";
// true means continuous, and false means not continuous (single result each time.)
// true면 음성 인식이 안 끝나고 계속 됩니다.
recognition.continuous = true;
// 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.
// maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정합니다.
recognition.maxAlternatives = 100000;
let speechToText = "";
console.log("봐라1");
console.log(recognition);
console.log("봐라2");
class VideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mySessionId: 'SessionCCC', //세션 이름 (방이름)
      myUserName: '김모씨' + Math.floor(Math.random() * 100), //사용자 이름
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined, //본인을 다른 사람에게 송출할 때
      subscribers: [], //다른 사람들을 수신할 때
      isMute: false,
      isNocam: false
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleCam = this.handleCam.bind(this);
    this.countUser = this.countUser.bind(this);
    this.chooseCase = this.chooseCase.bind(this);
    this.exitRoom = this.exitRoom.bind(this);
  }

  

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.joinSession();
    
    recognition.addEventListener("result", (e) => {
      let interimTranscript = "";
      // console.log(e);
      for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;
        // console.log(transcript);
        if (e.results[i].isFinal) {
          speechToText += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // speechToText : 지금까지 누적으로 대화한 내용 ( 처음부터... 발화가 끊기기 전 것도)
      // interimTranscript : 방금 전의 발화 (한 문장)
      // document.querySelector(".para").innerHTML = speechToText + interimTranscript;
      // console.log(speechToText);
      // console.log(speechToText + interimTranscript);
      console.log(interimTranscript);
      // 여기다가 서버로 닉네임 + interimTranscript 보내기
      // 닉네임으로 한다면 같은 세션 안의 사람들의 닉네임이 모두 달라야함.



    });
    recognition.start();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    // this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }
  //음소거 on/off 함수
  handleMute() {
    this.setState({
      isMute: !this.state.isMute
    });
    // console.log("on/off 버튼 누름 ");
    // console.log(this.state.isMute);
    if(this.state.isMute){
      // console.log("start recognition");
      // console.log(recognition);
      recognition.start();
    }else{
      // console.log("stop recognition");
      // console.log(recognition);
      recognition.stop();
    }
    this.state.publisher.publishAudio(this.state.isMute);
  }

  //영상 on/off
  handleCam() {
    this.setState({
      isNocam: !this.state.isNocam
    });
    this.state.publisher.publishVideo(this.state.isNocam);
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers
      });
    }
  }

  countUser() {
    return this.state.subscribers.length + 1;
  }

  chooseCase() {
    let count = this.countUser();
    if (count <= 2) return 'caseA';
    else return 'caseB';
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession()
      },
      () => {
        console.log(this.state.session);
        let mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          let subscriber = mySession.subscribe(event.stream, undefined);
          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              let devices = await this.OV.getDevices();
              let videoDevices = devices.filter(
                (device) => device.kind === 'videoinput'
              );

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '580x400', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher
              });
            })
            .catch((error) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message
              );
            });
        });
        console.log(this.state.session);
      }
    );
  }

  exitRoom() {
    this.leaveSession();
    this.props.props.push('/');
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;
    console.log(mySession);

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined
    });

    //나가기 버튼 누르면 main페이지로 이동
    // this.props.history.push('/');
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      let videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      if (videoDevices && videoDevices.length > 1) {
        let newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          let newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="container">
        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">
                {mySessionId}님의 쉐어룸({this.countUser()}명)
              </h1>
              <h1
                id="session-title"
                onClick={() => console.log(this.state.session)}
              >
                시간{' '}
              </h1>

              <div id="feature">
                <button id="feature-cc">
                  <img src={CCImg} alt="cc" width={50} />
                </button>
                <button id="feature-sound ">
                  <img src={SoundImg} alt="sound" width={50} />
                </button>
                <button id="feature-mouth">
                  <img src={MouthImg} alt="mouth" width={50} />
                </button>
              </div>
            </div>
            {/* 
            {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent
                  streamManager={this.state.mainStreamManager}
                />
                <input
                  className="btn btn-large btn-success"
                  type="button"
                  id="buttonSwitchCamera"
                  onClick={this.switchCamera}
                  value="Switch Camera"
                />
              </div>
            ) : null} */}
            <div id="video-container" className={this.chooseCase()}>
              {this.state.publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
            <div id="session-footer">
              <div id="feature">
                <button
                  onClick={this.handleMute}
                  className="round-button"
                  alt="mute"
                >
                  {this.state.isMute ? <MicOff /> : <Mic />}
                </button>
                <button
                  onClick={this.handleCam}
                  className="round-button"
                  alt="nocam"
                >
                  {this.state.isNocam ? <VideocamOff /> : <Videocam />}
                </button>
                <button
                  onClick={this.exitRoom}
                  className="round-button"
                  alt="exit"
                >
                  <Logout />
                </button>
              </div>
              <input
                id="input_text"
                type="text"
                placeholder="대화 내용을 입력해주세요"
              />

              <button className="round-button" alt="공유하기">
                <Share />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate'
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      let data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default VideoComponent;
