
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
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async function (req, res) {
  try {

    let sql = 'SELECT * FROM user WHERE username = "' + req.body.account + '" AND password = "' + req.body.password+'" LIMIT 1';

    var result = await dbQuery(sql);

    console.log(result);
    
    if(result.length==0){
      return res.status(403).json({
        message: 'Invalid login.',
      });
    }

    const userData = {
      _id: result[0].id,
      name: result[0].username,
      password: result[0].password
    };


    console.log(userData);
    const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
    const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);
    tokenList[refreshToken] = { accessToken, refreshToken };
    debug(`Gửi Token và Refresh Token về cho client...`);
    return res.status(200).json({accessToken, refreshToken});
  } catch (error) {
    debug(error);
    return res.status(501).json(error);
  }
}

/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
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
  refreshToken: refreshToken,
}