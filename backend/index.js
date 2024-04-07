const express = require("express");
const bodyParser = require("body-parser");
var io = require("socket.io")({
  path: "/io/webrtc",
});

// var twilio = require("twilio")(
//   "AC449e6dcb9ac7d9322fcc32fdbc4217f6",
//   "e3f1bda9ca3a37c09d2b5b01e4432f63"
// );
const { port } = require("./config");
const {
  addUser,
  removeUser,
  getUsersInRoom,
  getAllUsers,
} = require("./utilis/user");

const compilerRoutes = require("./routes/compiler");
const emailInviteRoutes = require("./routes/inviteOther");
const roomRoutes = require("./routes/room");

const rooms = {};
const messages = {};
const language = {};
const editorReadOnly = {};

const app = express();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res, next) => {
  res.send('<br><h1 align="center">CodeQuanta Api Latest</h1><br>');
  next();
});

app.use(compilerRoutes);
app.use(emailInviteRoutes);
app.use(roomRoutes);

//for error
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).send({ message: message });
});

const server = app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

io.listen(server);

// default namespace
io.on("connection", (socket) => {
  console.log("connected");
});

const peers = io.of("/webrtcPeer");

peers.on("connection", (socket) => {
  try {
    const room = socket.handshake.query.room;
    const username = socket.handshake.query.username;

    rooms[room] =
      (rooms[room] && rooms[room].set(socket.id, socket)) ||
      new Map().set(socket.id, socket);
    messages[room] = messages[room] || [
      {
        type: "text",
        message: {
          id: socket.id,
          sender: { uid: "server" },
          data: { text: "Welcome to CodeQuanta." },
        },
      },
    ];

    language[room] = language[room] || {
      value: "java",
      label: "JAVA",
      versionLabel: "JDK 1.8.0_66",
      mode: "java",
      version: "0",
    };

    editorReadOnly[room] = editorReadOnly[room] || false;

    addUser({
      id: socket.id,
      name: username,
      room: room,
    });
    socket.join(room);
    // console.log(getUsersInRoom(room));
    //  console.log(messages[room]);
    socket.emit("connection-success", {
      success: socket.id,
      peerCount: getUsersInRoom(room).length,
      messages: messages[room],
      users: getUsersInRoom(room),
      language: language[room],
      editorReadOnly: editorReadOnly[room],
    });

    socket.broadcast.to(room).emit("newuser", username);

    const broadcast = () => {
      const _connectedPeers = rooms[room];

      for (const [socketID, _socket] of _connectedPeers.entries()) {
        // if (socketID !== socket.id) {
        _socket.emit("joined-peers", {
          peerCount: getUsersInRoom(room).length, //connectedPeers.size,
          users: getUsersInRoom(room),
        });
        // }
      }
    };
    broadcast();

    const disconnectedPeer = (socketID) => {
      socket.broadcast.to(room).emit("leaveuser", username);
      //console.log("norem " + getAllUsers(room));
      removeUser(socketID);
      //console.log("rem " + getAllUsers(room));
      const _connectedPeers = rooms[room];
      //console.log(_connectedPeers);
      for (const [_socketID, _socket] of _connectedPeers.entries()) {
        _socket.emit("peer-disconnected", {
          peerCount: getUsersInRoom(room).length,
          socketID,
          users: getUsersInRoom(room),
        });
        // console.log(getUsersInRoom(room));
      }
    };

    socket.on("editorReadOnly", (data) => {
      editorReadOnly[room] = data.payload;
      socket.broadcast.to(room).emit("editorReadOnly", editorReadOnly[room]);
    });

    socket.on("langvalue", (data) => {
      console.log(data);
      language[room] = data.payload;
      console.log(language[room]);
      socket.broadcast.to(room).emit("langvalue", language[room]);
    });

    socket.on("new-message", (data) => {
      messages[room] = [...messages[room], JSON.parse(data.payload)];
    });

    socket.on("disconnect", () => {
      console.log("disconnected");

      rooms[room].delete(socket.id);
      messages[room] = rooms[room].size === 0 ? null : messages[room];
      disconnectedPeer(socket.id);
    });

    // socket.on("socket-to-disconnect", (socketIDToDisconnect) => {
    //   console.log("socket end disconnect");

    //   rooms[room].delete(socketIDToDisconnect);
    //   messages[room] = rooms[room].size === 0 ? null : messages[room];
    //   disconnectedPeer(socketIDToDisconnect);
    // });

    socket.on("onlinePeers", (data) => {
      const _connectedPeers = rooms[room];
      for (const [socketID, _socket] of _connectedPeers.entries()) {
        // don't send to self
        if (socketID !== data.socketID.local) {
          //        console.log("online-peer", data.socketID, socketID);
          socket.emit("online-peer", socketID);
        }
      }
    });

    socket.on("offer", (data) => {
      //    console.log(data);
      const _connectedPeers = rooms[room];
      for (const [socketID, socket] of _connectedPeers.entries()) {
        // don't send to self
        if (socketID === data.socketID.remote) {
          // console.log('Offer', socketID, data.socketID, data.payload.type)
          socket.emit("offer", {
            sdp: data.payload,
            socketID: data.socketID.local,
          });
        }
      }
    });

    socket.on("answer", (data) => {
      //    console.log(data);
      const _connectedPeers = rooms[room];
      for (const [socketID, socket] of _connectedPeers.entries()) {
        if (socketID === data.socketID.remote) {
          //        console.log("Answer", socketID, data.socketID, data.payload.type);
          socket.emit("answer", {
            sdp: data.payload,
            socketID: data.socketID.local,
          });
        }
      }
    });

    socket.on("candidate", (data) => {
      //    console.log(data);
      const _connectedPeers = rooms[room];
      // send candidate to the other peer(s) if any
      for (const [socketID, socket] of _connectedPeers.entries()) {
        if (socketID === data.socketID.remote) {
          socket.emit("candidate", {
            candidate: data.payload,
            socketID: data.socketID.local,
          });
        }
      }
    });
  } catch (e) {}
});

module.exports = app;
