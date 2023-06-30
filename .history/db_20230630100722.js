const mysql = require("mysql");
var cn;
function conectar() {
  cn = mysql.createConnection({
    server: "13.50.195.101",
    password: "cc882805$",
    database: "hcs",
    user: "root",
  });
  cn.on("error", (err) => {
    console.log(`error al conectar: ${err}`);
    console.log("reconectando...");
    cn.release();
    conectar();
  });
  cn.on("connect", () => {
    console.log("base de datos conectada!");
  });
}

conectar();

const list = (payload, callback) => {
  const condición = payload.condición ? ` where ${payload.condición}` : "";
  const campos = payload.campos ? payload.campos : "*";
  const sql = `select ${campos} from ${payload.tabla}${condición}`;
  cn.query(sql, (err, rows) => {
    err ? callback(err) : callback(rows);
  });
};
const guardarRegistro = (payload, callback) => {
  //console.log(payload)
  let detalle = Object.assign([], payload.detalle);
  let listIds = detalle
    .map((item) => {
      return item.idproducto;
    })
    .join(",");
  //console.log(detalle)
  //console.log(listIds)
  delete payload.detalle;
  save({ tabla: "registro", data: Object.assign({}, payload) }, (result) => {
    console.log(result);
    if (!result.errno) {
      const idregistro = result.insertId;
      cn.query(`delete from detalle where idregistro=${payload.id}`, (err) => {
        let counter = 0;
        detalle.forEach((item) => {
          item.idregistro = idregistro;
          save({ tabla: "detalle", data: item }, () => {
            counter += 1;
            console.log(`counter:${counter}`);
            if (counter == detalle.length) {
              let sql =
                "select id,`inventario final` from productos where id in(" +
                `${listIds})`;
              //console.log(sql)
              cn.query(sql, (err, rows) => {
                result.detalle = rows;
                callback(result);
              });
            }
          });
        });
      });
    }
  });
};
const save = (payload, callback) => {
  //console.log(payload, "save")
  let sql;
  if (payload.data.id) {
    let fields = Object.keys(payload.data).map((key) => {
      return `\`${key}\`=${
        typeof payload.data[key] === "string"
          ? "'" + payload.data[key] + "'"
          : payload.data[key]
      }`;
    });
    const id = payload.data.id;
    delete payload.data.id;
    sql = `update ${payload.tabla} set ${fields.join(",")} where id=${id}`;
  } else {
    let fields = Object.keys(payload.data).map((key) => {
      return `\`${key}\``;
    });
    let values = Object.keys(payload.data).map((key) => {
      return `${
        typeof payload.data[key] === "string"
          ? "'" + payload.data[key] + "'"
          : payload.data[key]
      }`;
    });
    sql = `insert into ${payload.tabla}(${fields.join(
      ","
    )}) values(${values.join(",")})`;
  }
  cn.query(sql, (err, result) => {
    err ? callback(err) : callback(result);
  });
};

const remove = (payload, callback) => {
  if (payload.id) {
    const sql = `delete from ${payload.tabla} where id=${payload.id}`;
    console.log(sql);
    cn.query(sql, (err) => {
      err
        ? callback(err)
        : callback({ text: `registro eliminado con id ${payload.id}` });
    });
  }
};
module.exports = { list, save, remove, guardarRegistro };
