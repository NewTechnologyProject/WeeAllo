const http = require("http");
const express = require("express");
const cors = require("cors");
// const socketio = require("socket.io");
// const io = require("socket.io")(3030, {
//   cors: {
//     origin: "*",
//   },
// });
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(router);

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => Number(user.userId) === userId);
};

io.on("connection", (socket) => {
  console.log("connected");
  socket.emit("welcome", "This is socket server");

  //Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //Notifi Send contact
  socket.on("sendUser", ({ userReceive, userSend }) => {
    // sendUser(userId, socket.id);
    socket.broadcast.emit("send", {
      userReceive,
      userSend,
    });
  });
  //Notifi accept contact
  socket.on("acceptUser", ({ userReceive, userSend }) => {
    // sendUser(userId, socket.id);
    socket.broadcast.emit("accept", {
      userReceive,
      userSend,
    });
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    socket.broadcast.emit("getMessage", {
      senderId,
      message,
    });
  });

  //send new room
  socket.on("newRoom", (newRoomMembers) => {
    socket.broadcast.emit("getNewRoom", newRoomMembers);
  });

  //send deleted room
  socket.on("deletedRoom", (deletedRoom) => {
    socket.broadcast.emit("getDeletedRoom", deletedRoom);
  });

  //send member out room
  socket.on("memberOutRoom", (room) => {
    socket.broadcast.emit("getMemberOutRoom", room);
  });

  //send new member
  socket.on("newMembers", (room) => {
    socket.broadcast.emit("getNewMembers", room);
  });

  //send removed member
  socket.on("removedMember", (room) => {
    socket.broadcast.emit("getRemovedMember", room);
  });

  //send updated room
  socket.on("updatedRoom", (room) => {
    socket.broadcast.emit("getUpdatedRoom", room);
  });

  //key press
  socket.on("typing", (roomId) => {
    socket.broadcast.emit("getTyping", {
      roomId: roomId,
      message: "Đang nhập...",
    });
  });

  //key up
  socket.on("stopTyping", (roomId) => {
    socket.broadcast.emit("getStopTyping", {
      roomId: roomId,
      message: "",
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 3030, () =>
  console.log(`Server has started.`)
);
