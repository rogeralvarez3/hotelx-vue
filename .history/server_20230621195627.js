const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, "dist")));
app.use(express.json());
app.use(express.urlencoded());

server.listen(3000, () => {
  console.log("listening on *:3000");
});
