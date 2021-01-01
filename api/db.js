'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  //host: process.env.DB_HOST || "127.0.0.1",
  host: process.env.DB_HOST || "140.136.151.130",
  port: process.env.DB_USER || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "dbproject",
  database: process.env.DB_NAME || "dbproject"
});

function dbQuery(databaseQuery) {
  return new Promise(data => {
    db.query(databaseQuery, function (error, result) { 
      if (error) 
        throw error;
      try {
        data(result);
      } catch (error){
        data({});
        throw error;
      }
    });
  });
}

module.exports = {
  dbQuery:dbQuery,
  db:db
}