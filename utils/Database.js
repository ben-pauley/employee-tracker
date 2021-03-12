const mysql = require("mysql");

const DBNAME = "employee_db";
const HOST = "localhost";
const PORT = 3306;
const USER = "root";
const PASS = "root";

const connection = mysql.createConnection({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASS,
  database: DBNAME,
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
