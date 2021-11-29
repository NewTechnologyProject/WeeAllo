const io = require("socket.io")(3030, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

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

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    if (receiverId.length > 0) {
      for (let id of receiverId) {
        const user = getUser(id.userId);
        if (user) {
          io.to(user.socketId).emit("getMessage", {
            senderId,
            message,
          });
        }
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});