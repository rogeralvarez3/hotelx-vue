const mysql = require("mysql");

var conn;
function connect() {
  conn = mysql.createConnection({
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
    connect();
  });
}
connect();
export default { conn };
