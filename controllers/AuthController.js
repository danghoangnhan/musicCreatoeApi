
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
 * controller register
 * @param {*} req 
 * @param {*} res 
 */
let register = async function (req, res) {
  try {
    let sql = 'SELECT count(username) FROM user WHERE username = "' + req.body.account + '"'; 
    //console.log(tempt);
    // (await dbQuery(sql)) = [ RowDataPacket { 'count(username)': 28 } ]
    // [0] = RowDataPacket { 'count(username)': 28 }
    // ['count(username)'] = 28 }
    if((await dbQuery(sql))[0]['count(username)']>0){
      return res.status(403).json({
        message: 'This username already exist',
      });
    }
    /*let sql = 'INSERT INTO Song (songname, tuneset, playcount, createtime) \
      VALUES (' + req.body.songname + ', ' + req.body.tuneset + 
      ', ' + 0 + ', ' + req.body.songname + ', ' + getDateTime() + ')';*/
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

    let sql2 = 'INSERT INTO user (username, password, access_token, list_id) \
    VALUES ("' + req.body.account + '", "' + req.body.password + '",NULL,NULL);';
    db.query(sql2, function (err, result, fields){
      if(err) throw err;
    })
    return res.status(200).json({
      message: 'Insert successful',
    });
  }
  catch(error){
    throw error;
  }
}

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
let login = async function (req, res) {
  try {
    debug(req.query);
    // sql = 'SELECT * FROM user WHERE username = "user1" AND password = "123456" LIMIT 1';
    let sql = 'SELECT * FROM user WHERE username = "' + req.query.username + '" AND password = "' + req.query.password + '" LIMIT 1';
    // query result is list format like [ , , , , ]
    var result = await dbQuery(sql);// connect to which db ?

    console.log(result);
    // if query has no result = 'Invalid login.'
    if(result.length==0){
      return res.status(403).json({
        message: 'Invalid login.'
      });
    }
    // what this ? all is result[0] didn't make sense to me
    const userData = {
      _id: result[0].id,
      name: result[0].username,
      password: result[0].password
    };


    //console.log(userData);
    // accessToken = "string"
    const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
    // refreshToken = "string"
    const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);
    tokenList = { accessToken, refreshToken };
    console.log("toooooooooookenList = "+tokenList);// toooooooooookenList = [object Object]
    debug(`Gửi Token và Refresh Token về cho client...`);
    return res.status(200).json({accessToken, refreshToken});
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
// why there can exist two refreshToken
let refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;// get old token
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {// new and old token compare
    try {
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      const userFakeData = decoded.data;

      debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      return res.status(200).json({accessToken});
    } catch (error) {
      debug(error);

      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};

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
  register: register,
  login: login,
  refreshToken: refreshToken
}