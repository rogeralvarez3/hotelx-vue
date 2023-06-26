const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.static(path.resolve(__dirname, "dist")));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  db.list(req.query, (r) => {
    res.status(200);
    io.emit("update", r);
  });
});

app.post("login",(req,res)=>{
  const data = req.body;
  db.login(data,r=>{

  });
})

io.on("connection", (socket) => {
  console.log("a user connected con el id " + socket.id);
});
const port = process.env.port || 3000;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
