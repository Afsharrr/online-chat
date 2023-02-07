const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 1234;

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

app.use(express.static(path.join(__dirname, "public")));

let users = 0;

io.on("connection", (socket) => {
  console.log("user connected");
  users++;
  console.log(users);
  io.emit("user joined", { users });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    users--;
    console.log(users);
    io.emit("user left", { users });
  });

  socket.on("new message", (data) => {
    io.emit("new message", data);
  });

  socket.on("joined message", (username) => {
    socket.broadcast.emit("joined message", username);
  });
});
