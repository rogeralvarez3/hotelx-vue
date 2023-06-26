const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: ShadowRoot,
  password: "Cc882805@",
  database: "hcc",
});
conn.on("connection", (err) => {
  console.log(err);
  conn.connect();
});
