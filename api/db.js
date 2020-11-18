'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_USER || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "dbproject",
  database: process.env.DB_NAME || "dbProject"
});

module.exports = db