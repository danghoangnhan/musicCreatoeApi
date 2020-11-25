const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')
let tokenList = {};

/**
 * controller history
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
let history = async function (req, res) {
  try {
    // sql = 'SELECT * FROM user WHERE username = "user1" AND password = "123456" LIMIT 1';
    let sql = 'SELECT * FROM Song WHERE playtime = "' + req.body.account + '" AND password = "' + req.body.password + '" LIMIT 1';
    // query result is list format like [ , , , , ]
    var result = await dbQuery(sql);// connect to which db ?

    console.log(result);
    // if query has no result = 'Invalid login.'
    if(result.length==0){
      return res.status(403).json({
        message: 'Invalid login.'
      });
    }
    // result is .json file result[0]{"key": value, "key": value, "key": value, ......}
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
}

function dbQuery(databaseQuery) {
  return new Promise(data => {
    db.query(databaseQuery, function (error, result) { // change db->connection for your code
      if (error) {
        console.log(error);
        throw error;
      }
      try {
        console.log(result);

        data(result);

      } catch (error) {
        data({});
        throw error;
      }
    });
  });
}

module.exports = {
  history: history
}