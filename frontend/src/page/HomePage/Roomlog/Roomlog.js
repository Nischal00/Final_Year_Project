import React from "react";
import "./Roomlog.css";
import { v4 as uuidv4 } from "uuid";
import Video from "./Component/video";
import Videos from "./Component/videos";
import DragDrop from "./Component/dragDrop";
import Notes from "../Notes/Notes";

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("multiple", "multiple");
  return fileSelector;
}

class RoomLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //chat.js
      message: "",
    };
  }

  componentDidMount = () => {
    this.fileSelector = buildFileSelector();
  };

  componentDidUpdate() {
    if (this.props.currentTab === "OUTPUT") this.scrollToBottom();
  }

  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.message === "") return;
    this.props.sendMessage({
      type: "text",
      message: {
        id: this.props.userid,
        sender: { uid: this.props.username },
        data: { text: this.state.message },
      },
    });
    this.setState({ message: "" });
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    const chat = document.getElementById("chatList");
    chat.scrollTop = chat.scrollHeight;
  };

  handleChange = (event) => {
    this.setState({ message: event.target.value });
  };

  onChange(e) {
    let files = e.target.files;
    let reader = new FileReader();

    reader.onload = (e) => {
      const maximumMessageSize = 262118; //65535 <=== 64KiB // 16384 <=== 16KiB to be safe
      if (e.target.result.length <= maximumMessageSize) {
        this.props.sendMessage({
          type: "image",
          message: {
            id: this.props.userid,
            sender: {
              uid: this.props.username,
            },
            data: e.target.result,
          },
        });
      } else {
        alert("Message exceeds Maximum Message Size!");
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(files[0]);
    }
  }
  renderMessage = (data) => {
    const msgDiv =
      data.type === "text" ? (
        <div className="msg">
          <p
            style={
              data.message.sender.uid === "server"
                ? {
                    paddingRight: 0,
                    color: "#cc0000",
                  }
                : {
                    paddingRight: 0,
                    color: `${this.props.themeValue.primaryColor}`,
                  }
            }
          >
            {"ec@" + data.message.sender.uid}
          </p>
          <p
            style={{
              paddingRight: 0,
              color: `${this.props.themeValue.textColor}`,
            }}
          >
            :
          </p>
          <p style={{ paddingRight: 0, color: "red" }}>~</p>
          <p
            style={{
              paddingLeft: 0,
              color: `${this.props.themeValue.textColor}`,
            }}
          >
            $
          </p>
          <div
            className="message"
            style={{
              color: `${this.props.themeValue.textColor}`,
              whiteSpace: "pre-wrap",
            }}
          >
            {data.message.data.text}
          </div>
        </div>
      ) : data.type === "code" ? (
        <div className="msg">
          <p
            style={
              data.message.sender.uid === "server"
                ? {
                    paddingRight: 0,
                    color: "#cc0000",
                  }
                : {
                    paddingRight: 0,
                    color: `${this.props.themeValue.primaryColor}`,
                  }
            }
          >
            {"ec@" + data.message.sender.uid}
          </p>
          <p
            style={{
              paddingRight: 0,
              color: `${this.props.themeValue.textColor}`,
            }}
          >
            :
          </p>
          <p style={{ paddingRight: 0, color: "red" }}>~</p>
          <p
            style={{
              paddingLeft: 0,
              color: `${this.props.themeValue.textColor}`,
            }}
          >
            $
          </p>

          <div
            className="message"
            style={
              data.message.data.value.memory === null
                ? {
                    color: "#cc0000",
                    whiteSpace: "pre-wrap",
                  }
                : this.props.themeValue.category === "light"
                ? {
                    color: "green", //"#0eff00",
                    whiteSpace: "pre-wrap",
                  }
                : {
                    color: "#0eff00",
                    whiteSpace: "pre-wrap",
                  }
            }
          >
            {data.message.data.value.output}
            {`\n`}
            <font color={this.props.themeValue.textColor}>
              --------------------------------{`\n`}
              {data.message.data.value.executedby !== null &&
                "-> Executed by : " + data.message.data.value.executedby + "\n"}
              {data.message.data.value.memory !== null &&
                "-> Memory : " + data.message.data.value.memory + "\n"}
              {data.message.data.value.cpuTime !== null &&
                "-> Cpu Time : " + data.message.data.value.cpuTime + "\n"}
            </font>
          </div>
        </div>
      ) : (
        <div className="msg">
          <p
            style={{
              paddingRight: 0,
              color: `${this.props.themeValue.primaryColor}`,
            }}
          >
            {"ec@" + data.message.sender.uid}
          </p>
          <p
            style={{
              paddingRight: 0,
              color: `${this.props.themeValue.textColor}`,
            }}
          >
            :
          </p>
          <p style={{ paddingRight: 0, color: "red" }}>~</p>
          <p
            style={{
              paddingLeft: 0,
              color: `${this.props.themeValue.textColor}`,
            }}
          >
            $
          </p>
          <img
            alt="img"
            className="message"
            style={{
              width: 200,
            }}
            src={data.message.data}
          />
        </div>
      );

    return <li>{msgDiv}</li>;
  };

  render() {
    const { localStream, remoteStreams } = this.props;

    return (
      <div>
        <DragDrop
          className="chatInputWrapper"
          sendFiles={(files) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const maximumMessageSize = 262118; //65535 <=== 64KiB // 16384 <=== 16KiB to be safe
              if (e.target.result.length <= maximumMessageSize)
                this.props.sendMessage({
                  type: "image",
                  message: {
                    id: this.props.userid,
                    sender: {
                      uid: this.props.username,
                    },
                    data: e.target.result,
                  },
                });
              else alert("Message exceeds Maximum Message Size!");
            };

            reader.readAsDataURL(files[0]);
          }}
        >
          <div
            className="chatWindow"
            style={{
              backgroundColor: `${this.props.themeValue.backgroundColor}`,
            }}
          >
            <div
              style={{
                zIndex: 101,
                position: "absolute",
                right: 5,
                top: 10,
                // bottom: 60,
                maxHeight: "90%",
                overflow: "scroll",
              }}
            >
              {localStream ? (
                <Video
                  videoType="localVideo"
                  videoStyles={{
                    width: 125,
                    borderRadius: 0,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                  }}
                  frameStyle={{
                    width: 125,
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor: `${this.props.themeValue.shadeColorInput}`,
                  }}
                  showMuteControls={true}
                  // ref={this.localVideoref}
                  videoStream={localStream}
                  autoPlay
                  muted
                ></Video>
              ) : (
                <div></div>
              )}
              <div
                style={{
                  zIndex: 3,
                  display: "flex",
                  flexDirection: "column",
                  //                backgroundColor: "red", //for testing
                  margin: 5,
                  float: "right",
                  overflowY: "scroll",
                }}
              >
                <Videos
                  remoteStreams={remoteStreams}
                  themeValue={this.props.themeValue}
                ></Videos>
              </div>
            </div>
            {this.props.currentTab === "OUTPUT" ? (
              <div>
                <ul className="chat" id="chatList">
                  {this.props.messages.map((data) => (
                    <div key={uuidv4()}>{this.renderMessage(data)}</div>
                  ))}
                </ul>
                <div
                  className="message-box"
                  style={{
                    width: "80%",
                    zIndex: 10,
                    position: "absolute",
                    bottom: 8,
                  }}
                >
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <input
                        className="textarea input"
                        type="text"
                        placeholder="Enter your message..."
                        onChange={this.handleChange}
                        value={this.state.message}
                        style={{
                          color: `${this.props.themeValue.textColor}`,
                          backgroundColor: `${this.props.themeValue.shadeColorInput}`,
                          paddingRight: "35px",
                        }}
                      />
                    </form>
                  </div>
                </div>
                <form onSubmit={this.choseFile}>
                  <div className="fileChoose">
                    <input
                      type="file"
                      name="file"
                      className="upload"
                      style={{
                        width: "18%",
                        zIndex: 10,
                        position: "absolute",
                        bottom: 9,
                        right: 12,
                      }}
                      onChange={(e) => this.onChange(e)}
                    />
                  </div>
                </form>
              </div>
            ) : (
              <Notes {...this.props} />
            )}
          </div>
        </DragDrop>
      </div>
    );
  }
}

export default RoomLog;
