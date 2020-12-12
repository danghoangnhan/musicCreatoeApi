const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";

// what this ?
/**
 * controller getsong
 * @param {*} req 
 * @param {*} res 
 */
let getsong = async function (req, res) {
  try {
    let sql = 'SELECT id, songName, tune_set FROM song';
    /*
    db.query(sql, function (err, result, fields){
        if(err) throw err;
      })
    console.log(result);
    return result;
    */
    /*
    console.log('1');
    console.log(await dbQuery(sql)); // didn't callback yet next line is execute
    console.log('2');
    */
    return res.status(200).json({
        message: await dbQuery(sql),
    });
  }
  catch(error){
    throw error;
  }
}

function dbQuery(databaseQuery) {
    return new Promise(data => {
      db.query(databaseQuery, function (error, result) { // change db->connection for your code
        if (error) {
          //console.log(error);
          throw error;
        }
        try {
          //console.log(result);
          data(result);
        } catch (error) {
          data({});
          throw error;
        }
      });
    });
  }
  
  module.exports = {
    getsong: getsong,
  }