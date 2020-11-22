/**
 * Created by trungquandev.com's author on 16/10/2019.
 * src/controllers/auth.js
 */
const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async function (req, res) {// ()
  try {
    debug(`req sucess with: ${req.body.account} and Password: ${req.body.password}\n`);
    console.log(req.body.account+" "+req.body.password);
    let sql = 'SELECT * FROM user WHERE account = ${req.body.account} AND password = ${req.body.password}'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    return res.status(200).json({accessToken, refreshToken});


  } catch (error) {
    return res.status(500).json(error);
  }
}

/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;// get old token
  // debug("tokenList: ", tokenList);
  
  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {// new and old token compare
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      // debug("decoded: ", decoded);
      const userFakeData = decoded.data;

      debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

      // gửi token mới về cho người dùng
      return res.status(200).json({accessToken});// if new/old token same res new token
    } catch (error) {
      debug(error);

      res.status(403).json({
        message: 'Invalid refresh token.',// if new != old
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',// if can't find old token
    });
  }
};

module.exports = {
  login: login,
  refreshToken: refreshToken,
}