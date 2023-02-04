const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen(3000, () => {
  console.log("Server listening at port %d", 3000);
});

app.use(express.static(path.join(__dirname, "public")));
