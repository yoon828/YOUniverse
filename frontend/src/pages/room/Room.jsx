/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';

// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_URL = 'https://cjswltjr.shop';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

const VideoComponent = () => {
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(
    '김모씨' + Math.floor(Math.random() * 100)
  );
  let _session = null;
  const [session, setSession] = useState(new OpenVidu().initSession());
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isMute, setIsMute] = useState(false);
  const [isNocam, setIsNocam] = useState(false);

  const history = useHistory();

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    joinSession();

    return () => {
      // leaveSession();
      console.log('페이지 나가기');
      window.removeEventListener('beforeunload', onbeforeunload);
      // alert('멈춰');
    };
  }, []);

  useEffect(() => {
    console.log('change sub');
    console.log(subscribers);
  }, [subscribers]);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };
  //음소거 on/off 함수
  const handleMute = () => {
    setIsMute(!isMute);
    publisher.publishAudio(!isMute);
  };
  //영상 on/off
  const handleCam = () => {
    // console.log('first');
    setIsNocam(() => !isNocam);
    publisher.publishVideo(isNocam);
  };
  const deleteSubscriber = (streamManager) => {
    let subscribers_copy = subscribers;
    let index = subscribers_copy.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers_copy.splice(index, 1);
      console.log(subscribers_copy);
      setSubscribers(subscribers_copy);
    }
  };
  const countUser = () => {
    return subscribers.length + 1;
  };

  const chooseCase = () => {
    let count = countUser();
    if (count <= 2) return 'caseA';
    else return 'caseB';
  };

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---

    const OV = new OpenVidu();

    // --- 2) Init a session ---
    let mySession = OV.initSession();
    _session = OV.initSession();
    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    _session.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      let subscriber = _session.subscribe(event.stream, undefined);
      console.log(subscriber);
      let subscribers_copy = subscribers;
      subscribers_copy.push(subscriber);

      console.log(subscribers);
      // Update the state with the new subscribers
      setSubscribers(() => subscribers_copy);
      console.log(subscribers);
    });

    // On every Stream destroyed...
    _session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    _session.on('exception', (exception) => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    getToken().then((token) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      _session
        .connect(token, { clientData: myUserName })
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = OV.initPublisher(undefined, {
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

          _session.publish(publisher);

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    });
    setSession(_session);
  };

  const exitRoom = () => {
    leaveSession();
    history.push('/');
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = session;
    console.log(_session);
    console.log(session);
    if (_session) {
      _session.disconnect();
      session.disconnect();
    }

    // Empty all properties...
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('김모씨' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  // const  switchCamera= async ()=> {
  //   try {
  //     const devices = await OV.getDevices();
  //     let videoDevices = devices.filter(
  //       (device) => device.kind === 'videoinput'
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       let newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         let newPublisher = OV.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true
  //         });

  //         //newPublisher.once("accessAllowed", () => {
  //         await session.unpublish(mainStreamManager);

  //         await session.publish(newPublisher);
  //         setState({
  //           currentVideoDevice: newVideoDevice,
  //           mainStreamManager: newPublisher,
  //           publisher: newPublisher
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

  const createSession = (sessionId) => {
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
  };

  const createToken = (sessionId) => {
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
  };

  return (
    <div className="container">
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">
              {mySessionId}님의 쉐어룸({countUser()}명)
            </h1>
            <h1 id="session-title" onClick={() => console.log(subscribers)}>
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
            {mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent
                  streamManager={mainStreamManager}
                />
                <input
                  className="btn btn-large btn-success"
                  type="button"
                  id="buttonSwitchCamera"
                  onClick={switchCamera}
                  value="Switch Camera"
                />
              </div>
            ) : null} */}
          <div id="video-container" className={chooseCase()}>
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
                {/* <UserVideoComponent streamManager={publisher} /> */}
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
          <div id="session-footer">
            <div id="feature">
              <button onClick={handleMute} className="round-button" alt="mute">
                {isMute ? <MicOff /> : <Mic />}
              </button>
              <button onClick={handleCam} className="round-button" alt="nocam">
                {isNocam ? <VideocamOff /> : <Videocam />}
              </button>
              <button onClick={exitRoom} className="round-button" alt="exit">
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
};

export default VideoComponent;
