import React, { Component } from "react";
import "./NoAccess.css";
import nomicroandvideo from "../../../assets/images/restrict/nomicroandvideo.png";

class NoAccess extends Component {
  handleClick = () => {
    localStorage.removeItem("username");
    this.props.handleDisconnectPermission();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="main-nomicrophoneandvideo">
        <div className="child-nomicrophoneandvideo">
          <img
            src={nomicroandvideo}
            alt="webrtc"
            className="imageicon-nomicrophoneandvideo"
          ></img>

          <p>
            <span className="para-span-nomicrophoneandvideo">
              You haven't allowed CodeQuanta <br></br>acess to your camera and
              microphone
            </span>{" "}
            <br></br>
            <br></br>
            Allow CodeQuanta to use your camera and microphone so that others
            on <br></br> the call can see and hear you. You can turn this off
            later. (
            <a
              style={{ textDecoration: "none" }}
              href="https://support.google.com/chrome/answer/2693767"
            >
              See more
            </a>
            )
          </p>

          <p>
            Go to{" "}
            <button
              className="gotohome-nomicrophoneandvideo"
              onClick={this.handleClick}
            >
              Home Page
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default NoAccess;
