const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");

let connection;

async function initDB() {
  connection = mysql.createConnection(config);

  const sqlTable = `CREATE TABLE IF NOT EXISTS people (
    name varchar(255) NOT NULL
  )`;

  connection.query(sqlTable, (error, results, fields) => {
    if (error) console.log("error in create table db: ", error);
  });

  console.log("finish initDB");
}

app.get("/", async (req, res) => {
  const sqlInsert = `INSERT INTO people(name) values('Marcos')`;

  connection.query(sqlInsert, (error, results, fields) => {
    if (error) console.log("error in insert db");
  });

  connection.query("SELECT * FROM people", (error, results) => {
    if (error) console.log("error in select db: ", error);

    console.log(results);
    res.send(
      `<h1>Full Cycle Rocks!</h1><h2>Names: ${JSON.stringify(results)} </h2>`
    );
    res.send("Registered name: ", listNames);
  });
});

async function main() {
  await initDB();
  app.listen(port, () => {
    console.log("Rodando na porta ", port);
  });
}

main();
