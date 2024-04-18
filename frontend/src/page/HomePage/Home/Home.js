import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, Slide, ToastContainer } from "material-react-toastify";
import io from "socket.io-client";
import { pcConfig } from "../Component/Services/PConfig";
import DropdownMenu from "../Component/Dropdown/DropdownSetting/DropdownMenu";
import DropdownLangMenu from "../Component/Dropdown/DropdownLang/DropDownLangMenu";
import ReactLoading from "react-loading";
import RoomLog from "../Roomlog/Roomlog";
import { changeLanguage } from "./changeLanguage";
import DropDownInvite from "../Component/Dropdown/DropdownInvite/DropDownInvite";
import MenuBar from "../Menu/Menu";
import OutsideGestureDetector from "../Component/Dropdown/OutsideGestureDetector";
import DropDownEnd from "../Component/Dropdown/DropdownEnd/DropDownEnd";
import DropDownParticipant from "../Component/Dropdown/DropdownParticipant/DropDownParticipant";
import Setting from "../../../assets/images/home/setting.png";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import debounce from "lodash/debounce";
import jsPDF from "jspdf";
import NoAccess from "../NoAccess/NoAccess";
import { isMacOs } from "react-device-detect";

import ReactTooltip from "react-tooltip";
import "material-react-toastify/dist/ReactToastify.css";

import "brace";
import "brace/mode/cobol";
import "brace/mode/dart";
import "brace/mode/matlab";
import "brace/mode/perl";
import "brace/mode/prolog";
import "brace/mode/csharp";
import "brace/mode/fortran";
import "brace/mode/kotlin";
import "brace/mode/objectivec";
import "brace/mode/pascal";
import "brace/mode/ruby";
import "brace/mode/javascript";
import "brace/mode/c_cpp";
import "brace/mode/python";
import "brace/mode/java";
import "brace/theme/vibrant_ink";
import "brace/theme/xcode";
import "brace/theme/iplastic";
import "brace/theme/monokai";
import "brace/theme/solarized_dark";
import "brace/theme/solarized_light";
import "brace/ext/language_tools";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "94.5vh",
      loadingFirstTime: true,
      users: [],
      endMenu: false,
      userMenu: false,
      username: "",
      iceserver: [],
      lang: {
        value: "java",
        label: "JAVA",
        versionLabel: "JDK 1.8.0_66",
        mode: "java",
        version: "0",
      },
      code: "",
      output: "",
      input: "",
      submit: false,
      open: false,
      openLang: false,
      themeValue: {
        category: "light",
        label: "IPlastic",
        theme: "iplastic",
        mode: 0,
        backgroundColor: "#eeeeee",
        primaryColor: "#3366cc",
        textColor: "#000000",
        shadeColorInput: "#a6a6a6",
        hintColor: "#19404a",
        headerColor: "#8e8e8e",
        sideColor: "#dddddd",
      },
      editorFontSize: 14,
      inviteUser: false,
      //------------------roomlog--------------------//
      localStream: null, // used to hold local stream object to avoid recreating the stream everytime a new offer comes
      remoteStream: null, // used to hold remote stream object that is displayed in the main screen

      remoteStreams: [], // holds all Video Streams (all remote streams)
      peerConnections: {}, // holds all Peer Connections

      status: null,

      sdpConstraints: {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true,
        },
      },
      messages: [],
      sendChannels: [],
      creator: false,
      editorReadOnly: false,
      currentTab: "OUTPUT",
      isDisconnected: false,
      permissionDenied: false,
      textvalue: "",
    };
    this.HOMEURL = "http://localhost:3000";
    // this.HOMEURL = "https://entercoding-gces.herokuapp.com";
    // this.ENDPOINT = "https://entercoding-api-gces.herokuapp.com";
    this.ENDPOINT = "http://localhost:8080";
    // this.SOCKET_URL = "https://entercoding-api-gces.herokuapp.com/webrtcPeer";
    this.SOCKET_URL = "http://localhost:8080/webrtcPeer";

    this.socket = null;

    const roomID = this.props.match.params.roomID;
    const content = window.localStorage.getItem(roomID);

    if (content) {
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      );
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
  }

  getLocalStream = () => {
    try {
      const success = (stream) => {
        window.localStream = stream;
        this.setState({
          permissionDenied: false,
          localStream: stream,
        });
      };
      const failure = (err) => {
        console.log(err);
        this.setState({
          permissionDenied: true,
        });
        // this.handleDisconnectPermission();

        // this.props.history.push("/permissiondenied");
      };
      const constraints = {
        audio: true,
        video: true,
        options: {
          mirror: true,
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(success)
        .catch(failure);
    } catch (error) {}
  };

  whoisOnline = () => {
    // let all peers know I am joining
    this.sendToPeer("onlinePeers", null, { local: this.socket.id });
  };

  sendToPeer = (messageType, payload, socketID) => {
    this.socket.emit(messageType, {
      socketID,
      payload,
    });
  };

  createPeerConnection = (socketID, callback) => {
    try {
      let pc = new RTCPeerConnection(pcConfig);
      //      let pc = new RTCPeerConnection(pcConfig);

      const peerConnections = { ...this.state.peerConnections, [socketID]: pc };
      this.setState({
        peerConnections,
      });

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          this.sendToPeer("candidate", e.candidate, {
            local: this.socket.id,
            remote: socketID,
          });
        }
      };

      pc.oniceconnectionstatechange = (e) => {
        if (pc.iceConnectionState === "disconnected") {
          const remoteStreams = this.state.remoteStreams.filter(
            (stream) => stream.id !== socketID
          );
          this.setState({
            remoteStream:
              (remoteStreams.length > 0 && remoteStreams[0].stream) || null,
          });
        }
      };

      pc.ontrack = (e) => {
        let _remoteStream = null;
        let remoteStreams = this.state.remoteStreams;
        let remoteVideo = {};

        // 1. check if stream already exists in remoteStreams
        const rVideos = this.state.remoteStreams.filter(
          (stream) => stream.id === socketID
        );

        // 2. if it does exist then add track
        if (rVideos.length) {
          _remoteStream = rVideos[0].stream;
          _remoteStream.addTrack(e.track, _remoteStream);

          remoteVideo = {
            ...rVideos[0],
            stream: _remoteStream,
          };
          remoteStreams = this.state.remoteStreams.map((_remoteVideo) => {
            return (
              (_remoteVideo.id === remoteVideo.id && remoteVideo) ||
              _remoteVideo
            );
          });
        } else {
          // 3. if not, then create new stream and add track
          _remoteStream = new MediaStream();
          _remoteStream.addTrack(e.track, _remoteStream);

          remoteVideo = {
            id: socketID,
            name: socketID,
            stream: _remoteStream,
          };
          remoteStreams = [...this.state.remoteStreams, remoteVideo];
        }

        this.setState((prevState) => {
          const remoteStream =
            prevState.remoteStreams.length > 0
              ? {}
              : { remoteStream: _remoteStream };

          return {
            ...remoteStream,
            remoteStreams, //: [...prevState.remoteStreams, remoteVideo]
          };
        });
      };

      pc.close = () => {
        // alert('GONE')
      };
      if (this.state.localStream)
        // pc.addStream(this.state.localStream)
        this.state.localStream.getTracks().forEach((track) => {
          pc.addTrack(track, this.state.localStream);
        });
      // return pc
      callback(pc);
    } catch (e) {
      // return;
      callback(null);
    }
  };

  componentDidMount() {
    try {
      this.getLocalStream();

      let name = localStorage.getItem("username");
      const permission = this.state.permissionDenied;
      if (!permission) {
        this.setState({
          username: name,
        });

        toast.success(`Welcome to CodeQuanta`, {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          pauseOnFocusLoss: false,
          progress: undefined,
        });
        const storageTheme = localStorage.getItem("themeValue");
        if (storageTheme !== null) {
          this.handleThemeChange(JSON.parse(storageTheme));
        }
        const config = {
          // apiKey: "AIzaSyA5nYeooM0GO6hgan73XCsvfZPykfHjfXs",
          // apiKey: "AIzaSyDKK-uAr09X2I3QfJjt_Ft0nzx-CKgvOKM",
          databaseURL:"https://final-year-project-3553d-default-rtdb.firebaseio.com/",
          apiKey: "AIzaSyDKK-uAr09X2I3QfJjt_Ft0nzx-CKgvOKM",
          authDomain: "final-year-project-3553d.firebaseapp.com",
          projectId: "final-year-project-3553d",
          storageBucket: "final-year-project-3553d.appspot.com",
          messagingSenderId: "1045507360080",
          appId: "1:1045507360080:web:a5a4700367ae80cc29d855",
          measurementId: "G-64GNZ48RE7",
        };
        window.firebase.initializeApp(config);

        var firepadRef = window.firebase
          .database()
          .ref(this.props.match.params.roomID);
        window.ace.require("ace/ext/language_tools");
        var editor = window.ace.edit("firepad-container");
        editor.setTheme(`ace/theme/${this.state.themeValue.theme}`);
        editor.setReadOnly(this.state.editorReadOnly);
        var session = editor.getSession();
        editor.setOptions({
          showPrintMargin: false,
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
        });

        editor.session.setUseWrapMode(true);
        session.setUseWorker(false);

        editor.getSession().on("change", () => {
          this.setState({
            code: editor.getValue(),
          });
        });

        window.Firepad.fromACE(firepadRef, editor, {
          defaultText:
            '//Try below demo code\npublic class Simple{\n    public static void main(String args[]){  \n     System.out.println("Hello CodeQuanta!");  \n    }  \n\n\n\n\n}',
        });

        this.socket = io.connect(this.SOCKET_URL, {
          path: "/io/webrtc",
          query: {
            room: this.props.match.params.roomID,
            username: name,
          },
        });

        this.socket.on("connection-success", (data) => {
          // this.getLocalStream();
          this.whoisOnline();
          this.setState({
            status: data.peerCount,
            messages: data.messages,
            lang: data.language,
            editorReadOnly: data.editorReadOnly,
          });
          this.handleUserInRoom(data.users);
        });
        this.socket.on("joined-peers", (data) => {
          this.handleUserInRoom(data.users);
          this.setState({
            status: data.peerCount,
          });
        });

        this.socket.on("peer-disconnected", (data) => {
          try {
            this.state.peerConnections[data.socketID].close();

            // get and stop remote audio and video tracks of the disconnected peer
            const rVideo = this.state.remoteStreams.filter(
              (stream) => stream.id === data.socketID
            );
            rVideo && this.stopTracks(rVideo[0].stream);
            // filter out the disconnected peer stream
            const remoteStreams = this.state.remoteStreams.filter(
              (stream) => stream.id !== data.socketID
            );

            this.handleUserInRoom(data.users);

            this.setState({
              remoteStreams,
              status: data.peerCount,
            });
          } catch (e) {
          } finally {
            this.handleUserInRoom(data.users);

            this.setState({
              status: data.peerCount,
            });
          }
        });

        this.socket.on("online-peer", (socketID) => {
          // 1. Create new pc
          this.createPeerConnection(socketID, (pc) => {
            // 2. Create Offer
            if (pc) {
              // Send Channel
              const handleSendChannelStatusChange = (event) => {
                // console.log(
                //   "send channel status: " + this.state.sendChannels[0].readyState
                // );
              };

              const sendChannel = pc.createDataChannel("sendChannel");
              sendChannel.onopen = handleSendChannelStatusChange;
              sendChannel.onclose = handleSendChannelStatusChange;

              this.setState((prevState) => {
                return {
                  sendChannels: [...prevState.sendChannels, sendChannel],
                };
              });

              // Receive Channels
              const handleReceiveMessage = (event) => {
                const message = JSON.parse(event.data);

                this.setState((prevState) => {
                  return {
                    messages: [...prevState.messages, message],
                  };
                });
              };

              const handleReceiveChannelStatusChange = (event) => {
                if (this.receiveChannel) {
                  // console.log(
                  //   "receive channel's status has changed to " +
                  //     this.receiveChannel.readyState
                  // );
                }
              };

              const receiveChannelCallback = (event) => {
                const receiveChannel = event.channel;
                receiveChannel.onmessage = handleReceiveMessage;
                receiveChannel.onopen = handleReceiveChannelStatusChange;
                receiveChannel.onclose = handleReceiveChannelStatusChange;
              };

              pc.ondatachannel = receiveChannelCallback;

              pc.createOffer(this.state.sdpConstraints).then((sdp) => {
                pc.setLocalDescription(sdp);

                this.sendToPeer("offer", sdp, {
                  local: this.socket.id,
                  remote: socketID,
                });
              });
            }
          });
        });

        this.socket.on("offer", (data) => {
          try {
            this.createPeerConnection(data.socketID, (pc) => {
              pc.addStream(this.state.localStream);

              // Send Channel
              const handleSendChannelStatusChange = (event) => {
                // console.log(
                //   "send channel status: " + this.state.sendChannels[0].readyState
                // );
              };

              const sendChannel = pc.createDataChannel("sendChannel");
              sendChannel.onopen = handleSendChannelStatusChange;
              sendChannel.onclose = handleSendChannelStatusChange;

              this.setState((prevState) => {
                return {
                  sendChannels: [...prevState.sendChannels, sendChannel],
                };
              });

              // Receive Channels
              const handleReceiveMessage = (event) => {
                const message = JSON.parse(event.data);

                this.setState((prevState) => {
                  return {
                    messages: [...prevState.messages, message],
                  };
                });
              };

              const handleReceiveChannelStatusChange = (event) => {
                if (this.receiveChannel) {
                  // console.log(
                  //   "receive channel's status has changed to " +
                  //     this.receiveChannel.readyState
                  // );
                }
              };

              const receiveChannelCallback = (event) => {
                const receiveChannel = event.channel;
                receiveChannel.onmessage = handleReceiveMessage;
                receiveChannel.onopen = handleReceiveChannelStatusChange;
                receiveChannel.onclose = handleReceiveChannelStatusChange;
              };

              pc.ondatachannel = receiveChannelCallback;

              pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(
                () => {
                  // 2. Create Answer
                  pc.createAnswer(this.state.sdpConstraints).then((sdp) => {
                    pc.setLocalDescription(sdp);

                    this.sendToPeer("answer", sdp, {
                      local: this.socket.id,
                      remote: data.socketID,
                    });
                  });
                }
              );
            });
          } catch (error) {}
        });

        this.socket.on("answer", (data) => {
          // get remote's peerConnection
          const pc = this.state.peerConnections[data.socketID];

          pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(
            () => {}
          );
        });

        this.socket.on("candidate", (data) => {
          // get remote's peerConnection
          const pc = this.state.peerConnections[data.socketID];

          if (pc) pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        });

        this.socket.on("langvalue", (data) => {
          this.setState({
            lang: data,
          });
        });

        this.socket.on("editorReadOnly", (data) => {
          this.setState({
            editorReadOnly: data,
          });
        });

        this.socket.on("newuser", (data) => {
          toast.info(`${data} has joined the room.`, {
            position: "top-right",
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            pauseOnFocusLoss: false,
            progress: undefined,
          });
        });

        this.socket.on("leaveuser", (data) => {
          toast.info(`${data} has left the room.`, {
            position: "top-right",
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            pauseOnFocusLoss: false,
            progress: undefined,
          });
        });
        this.handleConnectionChange();
        window.addEventListener("online", this.handleConnectionChange);
        window.addEventListener("offline", this.handleConnectionChange);
        document.addEventListener("keydown", this.keydownHandler);
      }
    } catch (e) {}
  }

  componentWillUnmount() {
    if (!this.state.permissionDenied) {
      window.removeEventListener("online", this.handleConnectionChange);
      window.removeEventListener("offline", this.handleConnectionChange);
      document.removeEventListener("keydown", this.keydownHandler);
    }
  }

  keydownHandler = (e) => {
    const command = isMacOs ? e.metaKey : e.ctrlKey;
    if (e.keyCode === 13 && command) this.handleSubmit();
  };

  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              !this.state.loadingFirstTime &&
                toast.success("Internet connection was restored.", {
                  position: "top-right",
                  autoClose: true,
                  transition: Slide,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  pauseOnFocusLoss: false,
                  progress: undefined,
                  style: { zIndex: "200" },
                });
              this.setState({
                loadingFirstTime: false,
              });
              return clearInterval(webPing);
            });
          })
          .catch(() => {
            this.setState({ isDisconnected: true }, () => {
              toast.error("You are currently offline.", {
                position: "top-right",
                autoClose: true,
                transition: Slide,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                pauseOnFocusLoss: false,
                progress: undefined,
                style: { zIndex: "200" },
              });
            });
          });
      }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true }, () => {
      toast.error("You are currently offline.", {
        position: "top-right",
        autoClose: true,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        pauseOnFocusLoss: false,
        progress: undefined,
        style: { zIndex: "200" },
      });
    });
  };

  keepOnPage = (e) => {
    var message =
      "Warning!\n\nNavigating away from this page will remove from this room.";
    e.returnValue = message;
    return message;
  };

  stopTracks = (stream) => {
    try {
      stream.getTracks().forEach((track) => track.stop());
    } catch (e) {}
  };

  sendMessage = (message) => {
    this.setState((prevState) => {
      return { messages: [...prevState.messages, message] };
    });
    this.state.sendChannels.map(
      (sendChannel) =>
        sendChannel.readyState === "open" &&
        sendChannel.send(JSON.stringify(message))
    );
    this.sendToPeer("new-message", JSON.stringify(message), {
      local: this.socket.id,
    });
  };

  sendCode = (message) => {
    this.setState((prevState) => {
      return { messages: [...prevState.messages, message] };
    });
    this.state.sendChannels.map(
      (sendChannel) =>
        sendChannel.readyState === "open" &&
        sendChannel.send(JSON.stringify(message))
    );
    this.sendToPeer("new-message", JSON.stringify(message), {
      local: this.socket.id,
    });
  };

  componentDidUpdate() {
    if (!this.state.permissionDenied) {
      var editor = window.ace.edit("firepad-container");
      editor.setFontSize(this.state.editorFontSize);
      editor.setTheme(`ace/theme/${this.state.themeValue.theme}`);
      editor.getSession().setMode(`ace/mode/${this.state.lang.mode}`);

      editor.setReadOnly(this.state.editorReadOnly && !this.state.creator); //logical && operator
    } else {
      this.handleDisconnectPermission();
    }
  }

  handleCurrentTab = (val) => {
    if (val === "OUTPUT") {
      this.setState({
        currentTab: "OUTPUT",
      });
    }
    if (val === "NOTES") {
      this.setState({
        currentTab: "NOTES",
      });
    }
  };

  handleLanguageChange = (language) => {
    toast.info(`${language.label} / ${language.versionLabel} is selected.`, {
      position: "top-right",
      autoClose: 2000,
      transition: Slide,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      pauseOnFocusLoss: false,
      progress: undefined,
    });
    if (this.state.lang.label !== language.label) {
      this.setState({
        lang: language,
      });
      var session = window.ace.edit("firepad-container").getSession();
      session.setValue(changeLanguage(this.state.code, language));
    } else if (this.state.lang.versionLabel !== language.versionLabel) {
      this.setState({
        lang: language,
      });
    }

    this.sendToPeer("langvalue", language, {
      local: this.socket.id,
    });
  };

  //menubar user in room
  handleUserInRoom = (value) => {
    try {
      let name = localStorage.getItem("username");
      var creator =
        name === value.filter((user) => user.name === name)[0].creator;

      this.setState({
        users: value,
        creator,
      });
    } catch (e) {}
  };

  //for theme change
  handleThemeChange = (value) => {
    localStorage.setItem("themeValue", JSON.stringify(value));
    this.setState({
      themeValue: value,
    });
  };

  //for font size of editor only
  handleEditorFontChange = (value) => {
    this.setState({
      editorFontSize: value,
    });
  };

  handleSubmit = () => {
    this.setState({
      submit: true,
    });
    //for later implementation
    // var editor = window.ace.edit("firepad-container");
    // var beautify = window.ace.require("ace/ext/beautify");
    // beautify.beautify(editor.session);
    if (this.state.themeValue.category === "dark") {
      toast("Running your Code ...", {
        position: "top-right",
        autoClose: false,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        pauseOnFocusLoss: false,
        progress: undefined,
        style: { zIndex: "200" },
      });
    } else {
      toast.dark("Running your Code ...", {
        position: "top-right",
        autoClose: false,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        pauseOnFocusLoss: false,
        progress: undefined,
        style: { zIndex: "200" },
      });
    }
    this.requestToAPI();
  };

  codeValue = (value) => {
    this.setState({
      code: value,
    });
  };

  //https://entercoding-api-gces.herokuapp.com/compiler/${value}
  requestToAPI = async () => {
    try {
      let name = localStorage.getItem("username");
      const response = await axios.post(
        `${this.ENDPOINT}/compiler/${this.state.lang.value}`,
        {
          code: this.state.code,
          input: this.state.input,
          version: this.state.lang.version,
        }
      );

      this.setState({
        submit: false,
      });
      toast.dismiss();
      this.setState({
        output: response.data.output,
      });
      response.data["executedby"] = name;

      this.sendCode({
        type: "code",
        message: {
          id: (this.socket && this.socket.id) || "",
          sender: { uid: "server" },
          data: { value: response.data },
        },
      });
    } catch (e) {}
  };

  handleEditorReadOnly = (value) => {
    this.setState({
      editorReadOnly: value,
    });
    this.sendToPeer("editorReadOnly", value, {
      local: this.socket.id,
    });
  };

  handleOpen = (value) => {
    this.setState({
      open: value,
    });
  };

  handleOpenInviteUser = (value) => {
    this.setState({
      inviteUser: value,
    });
  };

  handleOpenLang = (value) => {
    this.setState({
      openLang: value,
    });
  };

  handleOpenEndMenu = (value) => {
    this.setState({
      endMenu: value,
    });
  };

  handleOpenUserMenu = (value) => {
    this.setState({
      userMenu: value,
    });
  };

  handleDisconnectPermission = () => {
    try {
      const roomID = this.props.match.params.roomID;

      window.localStorage.removeItem(roomID);
      this.sendToPeer("disconnect", null, {
        local: this.socket.id,
      });
      this.socket.close();

      // stop local audio & video tracks
      this.stopTracks(this.state.localStream);

      // stop all remote audio & video tracks
      this.state.remoteStreams.forEach((rVideo) =>
        this.stopTracks(rVideo.stream)
      );

      // stop all remote peerconnections
      this.state.peerConnections &&
        Object.values(this.state.peerConnections).forEach((pc) => pc.close());
    } catch (error) {}
  };

  handleDisconnect = () => {
    try {
      localStorage.removeItem("username");
      const roomID = this.props.match.params.roomID;

      window.localStorage.removeItem(roomID);
      this.sendToPeer("disconnect", null, {
        local: this.socket.id,
      });
      this.socket.close();
      this.setState({
        username: "",
      });

      // stop local audio & video tracks
      this.stopTracks(this.state.localStream);

      // stop all remote audio & video tracks
      this.state.remoteStreams.forEach((rVideo) =>
        this.stopTracks(rVideo.stream)
      );

      // stop all remote peerconnections
      this.state.peerConnections &&
        Object.values(this.state.peerConnections).forEach((pc) => pc.close());
    } catch (error) {
    } finally {
      this.props.history.push("/");
    }
  };

  handleEditorHeight = () => {
    if (this.state.height === "94.5vh") {
      this.setState({
        height: "64.5vh",
      });
    } else {
      this.setState({
        height: "94.5vh",
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  saveContent = debounce((content) => {
    const roomID = this.props.match.params.roomID;
    window.localStorage.setItem(roomID, JSON.stringify(convertToRaw(content)));
  }, 1500);

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();

    this.saveContent(contentState);
    this.setState({
      editorState,
    });
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const value = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");

    this.setState({
      textvalue: value,
    });
  };

  handleJsPdfGenerator = () => {
    var MyArray = this.state.textvalue.split(" ");
    if (MyArray.length > 300) {
      alert("words should be less than 400 words");
    } else {
      let names = this.state.users.map((user) => user.name);

      var doc = new jsPDF("p", "pt");
      doc.text(210, 40, "INTERVIEW SUMMARY");

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;

      doc.text(250, 60, today);

      doc.setFont("courier");
      var yaxis = 100;
      for (let i = 0; i < names.length; i++) {
        doc.text(100, yaxis, "Candidate " + +(i + 1) + ": " + names[i]);
        yaxis = yaxis + 20;
      }

      doc.setFont("times", "normal", "normal");
      doc.setFontSize(14);

      doc.text(100, yaxis + 20, this.state.textvalue, {
        maxWidth: 400,
        align: "justify",
      });

      doc.save(today + "-CodeQuantaNotes.pdf");
    }
  };

  render() {
    // if (this.state.permissionDenied) {
    //   return (
    //     <NoAccess
    //       history={this.props.history}
    //       handleDisconnectPermission={this.handleDisconnectPermission}
    //     />
    //   );
    // }
    return (
      <div>
        <div className="main-div">
          <OutsideGestureDetector
            apply={this.state.inviteUser}
            setApply={this.handleOpenInviteUser}
          >
            <OutsideGestureDetector
              apply={this.state.endMenu}
              setApply={this.handleOpenEndMenu}
            >
              <MenuBar
                themeValue={this.state.themeValue}
                users={this.state.users}
                endMenu={this.state.endMenu}
                handleOpenEndMenu={this.handleOpenEndMenu}
                userMenu={this.state.userMenu}
                handleOpenUserMenu={this.handleOpenUserMenu}
                status={this.state.status}
                inviteUser={this.state.inviteUser}
                handleOpenInviteUser={this.handleOpenInviteUser}
                currentTab={this.state.currentTab}
                handleCurrentTab={this.handleCurrentTab}
                creator={this.state.creator}
                handleJsPdfGenerator={this.handleJsPdfGenerator}
              />
              {this.state.endMenu && (
                <DropDownEnd
                  apply={this.state.endMenu}
                  setApply={this.handleOpenEndMenu}
                  handleDisconnect={this.handleDisconnect}
                />
              )}
            </OutsideGestureDetector>

            {this.state.inviteUser && (
              <DropDownInvite
                apply={this.state.inviteUser}
                setApply={this.handleOpenInviteUser}
                themeValue={this.state.themeValue}
                roomURL={`${this.HOMEURL}/${this.props.match.params.roomID}`}
                username={this.state.username} //bug to fixed
                roomID={this.props.match.params.roomID}
              />
            )}
          </OutsideGestureDetector>
          <div className="row no-gutters">
            <div className="col-md-6 no-gutters">
              <div
                className="leftside"
                style={{
                  backgroundColor: "red",
                  borderColor: `${this.state.themeValue.shadeColorInput}`,
                }}
              >
                <div>
                  <div
                    id="firepad-container"
                    style={{ height: this.state.height }}
                  ></div>
                  {this.state.height === "64.5vh" ? (
                    <div
                      style={{
                        height: "30vh",
                        display: "flex",
                        borderTop: "2px solid",
                        borderColor: `${this.state.themeValue.shadeColorInput}`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",

                          height: "29.8vh",
                          width: "50px",

                          backgroundColor: `${this.state.themeValue.sideColor}`,
                        }}
                      ></div>

                      <textarea
                        value={this.state.input}
                        onChange={this.handleInputChange}
                        style={{
                          width: "100%",
                          height: "100%",
                          paddingLeft: "54px",
                          backgroundColor:
                            this.state.themeValue.backgroundColor,
                          color: this.state.themeValue.textColor,
                          resize: "none",
                          // paddingLeft: "50px",
                        }}
                        placeholder=">>Enter each input in new line.<<"
                      ></textarea>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    zIndex: 10,
                    position: "absolute",
                    justifyContent: "space-between",
                    display: "flex",
                    flexDirection: "row",
                    bottom: 8,
                    paddingLeft: "60px",
                    paddingRight: "10px",
                    // right: 10,
                  }}
                >
                  <Button
                    id="runBtn"
                    variant="success"
                    onClick={this.handleSubmit}
                    disabled={this.state.submit}
                    data-tip
                    data-for="runTip"
                    data-delay-show="600"
                    style={
                      this.state.submit
                        ? {
                            width: "110px",
                            height: "45px",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            verticalAlign: "center",
                            marginRight: "5px",
                            cursor: "progress",
                          }
                        : {
                            width: "110px",
                            height: "45px",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            verticalAlign: "center",
                            marginRight: "5px",
                            cursor: "pointer",
                          }
                    }
                  >
                    {this.state.submit && (
                      <ReactLoading
                        type="spokes"
                        color="#fff"
                        height="22.5px"
                        width="22.5px"
                      />
                    )}
                    {!this.state.submit && (
                      <span style={{ fontSize: 16 }}>Run</span>
                    )}
                  </Button>
                  <ReactTooltip id="runTip" place="top" effect="solid">
                    {isMacOs ? "⌘+enter" : "ctrl+enter"}
                  </ReactTooltip>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <OutsideGestureDetector
                      apply={this.state.openLang}
                      setApply={this.handleOpenLang}
                    >
                      <Button
                        id="langBtn"
                        variant="secondary"
                        onClick={() =>
                          this.handleOpenLang(!this.state.openLang)
                        }
                        style={{
                          width: "200px",
                          height: "45px",
                          display: "flex",
                          fontSize: "16px",
                          justifyContent: "center",
                          alignItems: "center",
                          verticalAlign: "center",
                          marginRight: "5px",
                        }}
                      >
                        {this.state.lang.label}
                        {` / `}
                        {this.state.lang.versionLabel}
                      </Button>
                      {this.state.openLang && (
                        <DropdownLangMenu
                          apply={this.state.openLang}
                          setApply={this.handleOpenLang}
                          lang={this.state.lang}
                          handleLanguageChange={this.handleLanguageChange}
                          themeValue={this.state.themeValue}
                        />
                      )}
                    </OutsideGestureDetector>
                    {/*whn clickoutside close dialog */}
                    <OutsideGestureDetector
                      apply={this.state.open}
                      setApply={this.handleOpen}
                    >
                      <Button
                        id="settingBtn"
                        variant="secondary"
                        onClick={() => this.handleOpen(!this.state.open)}
                        style={{
                          width: "45px",
                          height: "45px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          verticalAlign: "center",
                        }}
                      >
                        <img
                          src={Setting}
                          alt="setting"
                          height="27px"
                          width="27px"
                        />
                      </Button>
                      {this.state.open && (
                        <DropdownMenu
                          apply={this.state.open}
                          setApply={this.handleOpen}
                          creator={this.state.creator}
                          editorReadOnly={this.state.editorReadOnly}
                          handleEditorReadOnly={this.handleEditorReadOnly}
                          editorFontSize={this.state.editorFontSize}
                          handleEditorFontChange={this.handleEditorFontChange}
                          themeValue={this.state.themeValue}
                          handleThemeChange={this.handleThemeChange}
                          handleEditorHeight={this.handleEditorHeight}
                        />
                      )}
                    </OutsideGestureDetector>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 no-gutters">
              <div
                className="rightside"
                style={{
                  borderColor: `${this.state.themeValue.shadeColorInput}`,
                }}
              >
                <RoomLog
                  themeValue={this.state.themeValue}
                  localStream={this.state.localStream}
                  remoteStreams={this.state.remoteStreams}
                  messages={this.state.messages}
                  userid={(this.socket && this.socket.id) || ""}
                  sendMessage={this.sendMessage}
                  currentTab={this.state.currentTab}
                  username={this.state.username}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  {...this.props}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer style={{ top: 50, right: 10, width: "280px" }} />

        {this.state.userMenu && (
          <DropDownParticipant
            apply={this.state.userMenu}
            setApply={this.handleOpenUserMenu}
            users={this.state.users}
            themeValue={this.state.themeValue}
            status={this.state.status}
          />
        )}
      </div>
    );
  }
}

export default HomePage;
