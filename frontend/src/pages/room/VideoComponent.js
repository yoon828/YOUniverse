/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import './VideoComponent.scss';
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Logout,
  Share
} from '@mui/icons-material';
import { connect } from 'react-redux';
import { toggleMouth } from '../../redux/feature';
import { toggleModal } from '../../redux/share';
import { postHistory, postLogs } from 'api/room';

// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_URL = 'https://cjswltjr.shop';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
const recognition = new window.webkitSpeechRecognition();
// true면 음절을 연속적으로 인식하나 false면 한 음절만 기록함
recognition.interimResults = true;
// 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
recognition.lang = 'ko-KR';
// true means continuous, and false means not continuous (single result each time.)
// true면 음성 인식이 안 끝나고 계속 됩니다.
recognition.continuous = true;
// 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.
// maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정합니다.
recognition.maxAlternatives = 100000;

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    console.log('여기 밑에 확인해보기');
    console.log(props);
    console.log(props.storeSessionId);
    console.log(props.storename);
    this.state = {
      mySessionId: props.storeSessionId, //세션 이름 (방이름)
      myUserName: props.storename, //사용자 이름
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined, //본인을 다른 사람에게 송출할 때
      subscribers: [], //다른 사람들을 수신할 때
      isMute: false,
      isNocam: false,

      isSound: true, //음성서비스 on/off 확인
      inputComment: '', //채팅내용

      isCC: true, //자막 on/off 확인

      icons: ['diamond', 'heart', 'round', 'square', 'star', 'triangle'] //앞에 도형으로 사용자 식별
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

    this.handleSound = this.handleSound.bind(this);
    this.handleMouth = this.handleMouth.bind(this);
    this.comment = this.comment.bind(this);

    this.handleCC = this.handleCC.bind(this);
    this.getIdx = this.getIdx.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.joinSession();

    let flag = false;
    recognition.addEventListener('result', (e) => {
      if (!flag) {
        this.state.session
          .signal({
            data: JSON.stringify({
              name: this.state.myUserName,
              time: Date.now(),
              comment: 'start'
            }),
            to: [],
            type: 'sttStart'
          })
          .then(() => {
            console.log('Comment successfully sent');
            //여기서 데이터 보내면 될 듯
          })
          .catch((error) => {
            console.error(error);
          });
        flag = true;
      }
      for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          this.state.session
            .signal({
              data: JSON.stringify({
                name: this.state.myUserName,
                time: Date.now(),
                comment: transcript
              }),
              to: [],
              type: 'sttEnd'
            })
            .then(() => {
              console.log('Comment successfully sent');
            })
            .catch((error) => {
              console.error(error);
            });
          flag = false;
          // 여기다가 서버로 닉네임 + interimTranscript 보내기
          // 닉네임으로 한다면 같은 세션 안의 사람들의 닉네임이 모두 달라야함.
        } else {
          // interimTranscript += transcript;
        }
      }

      // speechToText : 지금까지 누적으로 대화한 내용 ( 처음부터... 발화가 끊기기 전 것도)
      // interimTranscript : 방금 전의 발화 (한 문장)
      // 여기다가 서버로 닉네임 + interimTranscript 보내기
      // 닉네임으로 한다면 같은 세션 안의 사람들의 닉네임이 모두 달라야함.
    });
    recognition.start();
  }

  componentWillUnmount() {
    recognition.stop();
    window.removeEventListener('beforeunload', this.onbeforeunload);
    // this.onbeforeunload();
  }

  onbeforeunload(event) {
    // window.location.reload();
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

  //mouth 확대  on/off 함수
  handleMouth() {
    this.props.dispatch(toggleMouth());
  }

  //음소거 on/off 함수
  handleMute() {
    const input = document.getElementById('input_text');

    this.setState({
      isMute: !this.state.isMute
    });
    if (this.state.isMute) {
      recognition.start();
      input.disabled = true;
    } else {
      recognition.stop();
      input.disabled = false;
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

  //음성 서비스 on/off
  handleSound() {
    this.setState({
      isSound: !this.state.isSound
    });
  }

  //자막 on/off
  handleCC() {
    this.setState({
      isCC: !this.state.isCC
    });
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

  //채팅 남기기
  comment() {
    console.log(this.state.session);
    this.state.session
      .signal({
        data: JSON.stringify({
          name: this.state.myUserName,
          time: Date.now(),
          comment: this.state.inputComment
        }),
        to: [],
        type: 'ttsChat'
      })
      .then(() => {
        console.log('Comment successfully sent');
        //여기서 데이터 보내면 될 듯
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getIdx(connectionId) {
    for (let idx = 0; idx < this.state.subscribers.length; idx++) {
      if (
        this.state.subscribers[idx].stream.connection.connectionId ===
        connectionId
      )
        return idx;
    }
  }
  //stream change
  updatePublisherSpeaking(streamManager) {
    streamManager.updatePublisherSpeaking({
      interval: 100,
      threshold: -50
    });
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();
    //   this.OV.setAdvancedConfiguration({
    //     publisherSpeakingEventsOptions: {
    //         interval: 100,   // Frequency of the polling of audio streams in ms (default 100)
    //         threshold: -50  // Threshold volume in dB (default -50)
    //     }
    // });
    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession()
      },
      () => {
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
          // console.log(subscribers);
          // if (subscribers?.length >= 5) {
          //   alert('인원 초과!');
          //   console.log('6명 이상');
          //   this.leaveSession();
          //   this.props.props.push('/');
          // }
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

        // mySession.on('publisherStartSpeaking', (event) => {
        //   this.setState({speaker: event.connection.connectionId});
        //   console.log('User ' + event.connection.connectionId + ' start speaking');
        // });

        // mySession.on('publisherStopSpeaking', (event) => {
        //   this.setState({speaker: 'speaker'});
        //   console.log('User ' + event.connection.connectionId + ' stop speaking');
        // });
        const root = document.getElementById('log_list');
        //chat settings
        mySession.on('signal:ttsChat', (event) => {
          let idx = this.getIdx(event.from.connectionId);
          if (idx === undefined) idx = 5;
          console.log(this.props);
          let json = JSON.parse(event.data);
          let list = [...this.props.logList];
          list.push({
            icon: idx,
            name: json.name,
            comment: json.comment,
            time: json.time
          });
          this.props.setLogList(list);

          //자막 내용 변경
          let subtitle = document.getElementById(
            `subtitle_${event.from.connectionId}`
          );
          subtitle.innerText = json.comment;

          //자막이 7초뒤에 사라지도록
          setTimeout(() => {
            subtitle.innerText = '';
          }, 7000);

          //음성서비스가 켜져있고, 본인이 아니라면 음성 제공
          if (
            this.state.isSound &&
            JSON.parse(event.from.data).clientData !== this.state.myUserName
          ) {
            let utterance = new SpeechSynthesisUtterance(
              json.name + ' : ' + json.comment
            );
            speechSynthesis.speak(utterance);
          }
        });
        mySession.on('signal:sttStart', (event) => {
          // this.setState({ speaker: event.from.connectionId });
          let video = document.getElementsByClassName(
            event.from.connectionId
          )[0];
          video.classList.add('speaking');

          //음성서비스가 켜져있고, 본인이 아니라면 음성 제공
          let idx = this.getIdx(event.from.connectionId);
          if (idx === undefined) idx = 5;
          let json = JSON.parse(event.data);
          let list = [...this.props.logList];
          list.push({
            icon: idx,
            name: json.name,
            comment: '변환중입니다!',
            time: json.time
          });
          this.props.setLogList(list);
        });

        mySession.on('signal:sttEnd', (event) => {
          this.setState({ speaker: 'speaker' });
          let video = document.getElementsByClassName(
            event.from.connectionId
          )[0];
          console.log(video);
          video.classList.remove('speaking');

          let json = JSON.parse(event.data);
          let list = [...this.props.logList];

          let arrName = list.map((el) => el.name);
          let idx = arrName.lastIndexOf(json.name);
          list[idx].comment = json.comment;

          this.props.setLogList(list);

          //자막 변경
          let subtitle = document.getElementById(
            `subtitle_${event.from.connectionId}`
          );
          subtitle.innerText = json.comment;
          setTimeout(() => {
            subtitle.innerText = '';
          }, 7000);
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
      }
    );
  }

  exitRoom() {
    let sessionId = this.state.session.sessionId;
    let createTime = this.state.session.connection.creationTime;
    let participant = '';
    this.state.subscribers.map((el, idx) => {
      let name = JSON.parse(el.stream.connection.data).clientData;
      participant += `,${name}`;
    });
    if (window.confirm('방을 나가시겠습니까?')) {
      let roomName = window.prompt('방 제목을 입력해주세요');
      let isLogSave = false;
      if (window.confirm('로그를 저장하시겠습니까?')) isLogSave = true;
      let data = {
        hostName: this.state.myUserName,
        participants: participant,
        roomName: roomName,
        createTime: createTime
      };
      if (isLogSave) {
        let chats = [];
        this.props.logList.map((log, idx) => {
          chats.push({
            chatTime: log.time,
            name: log.name,
            content: log.comment
          });
        });
        data.sessionId = sessionId;
        data.chats = chats;
      }
      console.log(data);
      postHistory(data)
        .then(({ data }) => {
          console.log(data);
          alert(data.message);
          if (!data.success) return;
          this.leaveSession();
          this.props.props.push('/');
        })
        .catch((err) => console.log(err));
    }
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;

    console.log(mySession);
    if (mySession) {
      console.log('나가기');
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

  //엔터키 이벤트
  handleKeyUp = (e) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      console.log(this.state.inputComment);
      this.comment();
      e.target.value = '';
    }
  };

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
    //const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="container">
        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">
                쉐어룸({this.countUser()}
                명)
              </h1>
              {/* <h1
                id="session-title"
                onClick={() => console.log(this.state.session)}
              >
                시간
              </h1> */}

              <div id="feature">
                <button id="feature-cc">
                  <img
                    src="/asset/img/cc.png"
                    alt="cc"
                    width={50}
                    onClick={this.handleCC}
                  />
                </button>
                <button id="feature-sound">
                  <img
                    src="/asset/img/sound.png"
                    alt="sound"
                    width={50}
                    onClick={this.handleSound}
                  />
                </button>
                <button
                  onClick={this.handleMouth}
                  className="round-button"
                  alt="mute"
                >
                  <img
                    src={
                      this.props.bigMouth
                        ? '/asset/img/mouth.png'
                        : '/asset/img/silent.png'
                    }
                    alt="mouth"
                    width={50}
                  />{' '}
                  :
                </button>
              </div>
            </div>
            <div id="video-container" className={this.chooseCase()}>
              {this.state.publisher !== undefined ? (
                <div
                  className="stream-container"
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }
                >
                  <UserVideoComponent
                    streamManager={this.state.publisher}
                    connectionId={
                      this.state.publisher.session.connection.connectionId
                    }
                    isCC={this.state.isCC}
                    icon="5"
                  />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent
                    streamManager={sub}
                    connectionId={sub.stream.connection.connectionId}
                    isCC={this.state.isCC}
                    icon={i}
                  />
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
                onKeyUp={this.handleKeyUp}
                id="input_text"
                type="text"
                value={this.inputComment}
                onChange={(e) => {
                  this.setState({
                    inputComment: e.target.value
                  });
                }}
                placeholder="대화 내용을 입력해주세요"
              />

              <button
                className="round-button"
                alt="공유하기"
                onClick={() => this.props.dispatch(toggleModal())}
              >
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
const mapStateToProps = (state) => ({
  bigMouth: state.feature.value.bigMouth
});
export default connect(mapStateToProps)(VideoComponent);
