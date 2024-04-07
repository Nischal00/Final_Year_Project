import React, { Component } from "react";
import HomePage from "../Home/Home";
import axios from "axios";
import icon from "../../../assets/images/login/message.png";
import "./Login.css";
import ReactLoading from "react-loading";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      login: false,
      error: false,
      errorvalue: "",
      submit: false,
    };
    // this.ENDPOINT = "https://entercoding-api-gces.herokuapp.com";
    this.ENDPOINT = "http://localhost:8080";
  }

  componentDidMount() {
    const v4 = new RegExp(
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
    );
    const urlRoomId = this.props.match.params.roomID;
    const result = urlRoomId.match(v4);
    if (result === null) {
      this.props.history.push("/");
    }
    let username = localStorage.getItem("username");
    if (username) {
      this.setState({
        login: true,
      });
    } else {
      this.setState({
        login: false,
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value, error: false });
  };

  handleJoinButton = async () => {
    this.setState({
      submit: true,
    });
    let roomId = this.props.match.params.roomID;
    let input = this.state.inputValue;
    if (input === "") {
      this.setState({
        error: true,
        errorvalue: "Field cannot be empty.",
        submit: false,
      });
    } else if (input.length < 3 || input.length > 10) {
      this.setState({
        error: true,
        errorvalue: "Name length must be between 3 to 10.",
        submit: false,
      });
    } else {
      let limit = await this.checkLimitExceed(roomId);
      let exist = await this.checkExistingUser(roomId, this.state.inputValue);
      if (limit) {
        this.setState({
          error: true,
          errorvalue: "Room limit exceeds.",
          submit: false,
        });
      } else if (!exist) {
        localStorage.setItem("username", input);
        window.location.reload();
        this.setState({
          submit: true,
        });
      } else {
        this.setState({
          error: true,
          errorvalue: "Username has already taken.",
          submit: false,
        });
      }
    }
  };

  checkLimitExceed = async (urlRoomId) => {
    const res = await axios.post(`${this.ENDPOINT}/rooms/checklimit`, {
      roomId: urlRoomId,
    });

    return res.data;
  };

  checkExistingUser = async (urlRoomId, username) => {
    const res = await axios.post(`${this.ENDPOINT}/rooms/checkuser`, {
      roomId: urlRoomId,
      username: username,
    });

    return res.data;
  };

  returnPage = () => {
    return !this.state.login ? (
      <div className="main-login">
        <div className="child-login">
          <img src={icon} alt="webrtc" width="64px"></img>
          <p>
            <span className="para-span-login">Please enter your name</span>{" "}
            <br></br>
            Your name is visible to other participants of this interview.
          </p>
          <div className="search-wrapper cf">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && this.handleJoinButton()}
              autoFocus={true}
            />
            <button
              onClick={this.handleJoinButton}
              style={
                this.state.submit
                  ? { cursor: "not-allowed" }
                  : { cursor: "pointer" }
              }
              disabled={this.state.submit}
            >
              {this.state.submit ? (
                <ReactLoading
                  type="spokes"
                  color="#fff"
                  height="22.5px"
                  width="22.5px"
                />
              ) : (
                <b>Join!</b>
              )}
            </button>
          </div>
          <div className="error-div-login">
            <p
              className="error-message-login"
              style={this.state.error ? { opacity: "1" } : { opacity: "0" }}
            >
              {this.state.errorvalue}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <HomePage {...this.props} />
    );
  };

  render() {
    return this.returnPage();
  }
}

export default Login;
