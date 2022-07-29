/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import '../room/RoomPage.scss';

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div className="stream">
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div className="stream-text">
              <span>{this.getNicknameTag()}</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
