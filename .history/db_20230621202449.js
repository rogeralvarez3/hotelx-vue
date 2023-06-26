const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Cc882805@",
  database: "hcc",
});
conn.on("connection", () => {
  console.log("Base de datos conectada correctamente");
});
conn.on("error", (err) => {
  console.log(err);
  conn.connect();
});
