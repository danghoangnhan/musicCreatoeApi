
const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";

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
    // sql = 'SELECT * FROM user WHERE username = "user1" AND password = "123456" LIMIT 1';
    let sql = 'SELECT * FROM user WHERE username = "' + req.body.account + '" AND password = "' + req.body.password + '" LIMIT 1';
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
    tokenList = { accessToken};
    //console.log("tokenList = "+tokenList);
    debug(`Gửi Token và Refresh Token về cho client...`);
    return res.status(200).json({accessToken});
  } catch (error) {
    debug(error);
    return res.status(501).json(error);
  }
}

/**
 * controller accessToken
 * @param {*} req 
 * @param {*} res 
 */

let accessToken = async (req, res) => {
  const accessTokenFromClient = req.body.accessToken;// get old token
  if (accessTokenFromClient && (tokenList[accessTokenFromClient])) {// new and old token compare
    try {
      const decoded = await jwtHelper.verifyToken(accessTokenFromClient, accessTokenSecret);
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
  login: login,
  accessToken: accessToken,
}