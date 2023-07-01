const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const fs = require("fs");
const io = new Server(server, { cors: { origin: "*" } });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("./upload");
const dotenv = require("dotenv").config().parsed;
const history = require("connect-history-api-fallback");
app.use(cors());
app.use(history());
app.use(express.static(path.resolve(__dirname, "dist")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/get", (req, res) => {
  console.log(req.body)
  if (req.body.tabla == "users" && !verifyToken(req.body.token)) {
    res.send({ error: "access denied" });
  } else {
    db.list(req.body, (r) => {
      if (r.length > 0) {
        if (r[0].password) {
          r.forEach((row) => {
            delete row.password;
          });
        }
      }

      res.send(r);
    });
  }
});
app.post("/", (req, res) => {
  //console.log(req.body);
  if (verifyToken(req.body.token)) {
    delete req.body.token;
    if (req.body.tabla == "users") {
      const salt = bcrypt.genSaltSync(parseInt(dotenv.SALT_ROUNDS));
      const hash = bcrypt.hashSync(req.body.data.password, salt);
      req.body.data.password = hash;
      console.log(hash);
    }
    db.save(req.body, (r) => {
      if (r.insertId) {
        req.body.data.id = r.insertId;
      }
      if (req.body.tabla == "users") delete req.body.data.password;
      io.emit("update", req.body);
      res.send(r);
    });
  } else {
    res.send({ error: "acceso denegado" });
  }
});
app.post("/verifyToken", (req, res) => {
  if (verifyToken(req.body.token)) {
    res.send({ success: "token ok" });
  }
});
app.post("/login", (req, res) => {
  const data = { tabla: "users", condición: `name = '${req.body.name}'` };
  db.list(data, (r) => {
    console.log(r);
    if (r) {
      bcrypt.compare(req.body.password, r[0].password, (err, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign(req.body, dotenv.SECRET_KEY);
          delete req.body.password;
          req.body.id = r[0].id;
          req.body.token = token;
        } else {
          req.body = { error: "contraseña incorrecta" };
        }

        res.send(req.body);
      });
    }
  });
});

app.delete("/", (req, res) => {
  if (verifyToken(req.body.token)) {
    db.remove(req.body, (r) => {
      res.send(r);
      io.emit("delete", req.body);
    });
  } else {
    res.send({ error: "acceso denegado" });
  }
});
app.post("/savePost", upload.single("file"), (req, res) => {
  const data = Object.assign({}, req.body);
  db.save({ tabla: "posts", data: data }, (r) => {
    if (r.insertId) {
      let oldFileName = path.join(__dirname, "images", req.file.filename);
      let newFileName = path.join(__dirname, "images", `${r.insertId}.jpg`);
      fs.renameSync(oldFileName, newFileName);
      io.emit("update", { tabla: "posts" });
    }
    res.send({ success: true });
  });
});

io.on("connection", (socket) => {
  console.log("a user connected con el id " + socket.id);
});
const port = process.env.port || 80;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

function verifyToken(token) {
  if (token) {
    return jwt.verify(token, dotenv.SECRET_KEY);
  } else {
    return false;
  }
}
