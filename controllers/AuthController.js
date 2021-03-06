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

/**
 * controller register
 * @param {*} req 
 * @param {*} res 
 */
let register = async function (req, res) {
  try {
    let sql = 'SELECT count(userName) FROM user WHERE userName = "' + req.body.account + '";'; 
    //console.log(tempt);
    // (await dbQuery(sql)) = [ RowDataPacket { 'count(username)': 28 } ]
    // [0] = RowDataPacket { 'count(username)': 28 }
    // ['count(username)'] = 28 }
    var result = await db.dbQuery(sql);
    if (result[0]['count(userName)']>0){
      return res.status(403).json({
        message: 'This userName already exist',
      });
    }
    // User(id, username, password, accesstoken, list)
    
    //https://www.w3schools.com/nodejs/shownodejs_cmd.asp?filename=demo_db_select
    /*con.connect(function(err) {
        if (err) throw err;
        //Select all customers and return the result object:
        con.query("SELECT * FROM customers", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
    */
    // user(id, username, password)
    debug(req.body)
    let sql2 = 'INSERT INTO user (userName, passWord) VALUES ("' + req.body.account + '", "' + req.body.password + '");';
    debug(sql2)
    var result = await db.dbQuery(sql2);
    return res.status(200).json({
      message: 'insert account successful',
    });
  }
  catch(err){
    throw err;
  }
}

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */

let login = async function (req, res) {
  try {    
    debug(req.query);
    let sql = 'SELECT * FROM user WHERE userName = "' + req.query.username + '" AND passWord = "' + req.query.password + '" LIMIT 1;';
    // query result is list format like [ , , , , ]
    var result = await db.dbQuery(sql);// connect to which db ?
    debug(sql);
    console.log(result);

    if(result.length==0){
      return res.status(403).json({
        message: 'Invalid login.'
      });
    }
    // what this ? all is result[0] didn't make sense to me
 
    debug(result);
    return res.status(200).json(result[0]);
  } catch (error) {
    debug(error);
    return res.status(501).json(error);
  }
};

/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */


module.exports = {
  register: register,
  login: login,
  // refreshToken: refreshToken
}