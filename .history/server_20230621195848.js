const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "dist")));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected con el id " + socket.id);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
