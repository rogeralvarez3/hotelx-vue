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
const dotenv = require("dotenv").config().parsed;

app.use(express.static(path.resolve(__dirname, "dist")));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  db.list(req.query, (r) => {
    res.send(r);
  });
});
app.post("/", (req, res) => {
  //console.log(req.body);
  if (req.body.tabla == "users") {
    const salt = bcrypt.genSaltSync(parseInt(dotenv.SALT_ROUNDS));
    const hash = bcrypt.hashSync(req.body.data.password, salt);
    req.body.data.password = hash;
  }
  db.save(req.body, (r) => {
    res.send(r);
    if (r.insertId) {
      req.body.data.id = r.insertId;
    }
    if (req.body.tabla == "users") delete req.body.tabla.data.password;
    io.emit("update", req.body);
  });

  //res.status(200);
});
app.post("/login", (req, res) => {
  const data = { tabla: "users", condición: `name = '${req.body.name}'` };
  db.list(data, (r) => {
    console.log(r);
    if (r) {
      bcrypt.compare(req.body.password, r.password, (err, result) => {
        if (result) {
          const token = jwt.sign(req.body, dotenv.SECRET_KEY);
          delete req.body.password;
          req.body.token = token;
        } else {
          req.body = { error: "contraseña incorrecta" };
        }

        res.send(req.body);
      });
    }
  });
});

io.on("connection", (socket) => {
  console.log("a user connected con el id " + socket.id);
});
const port = process.env.port || 3000;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
