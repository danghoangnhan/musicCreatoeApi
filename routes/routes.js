'use strict';
module.exports = function(app) {
};
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");// direct to AuthMiddleware.js
const AuthController = require("../controllers/AuthController");// direct to AuthController.js



/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
  // when user click login button
  // router.post(get data) get the response(ex:140.136.151.130.3000/login) from app
  // (active, which file . which movement)
  router.post("/login", AuthController.login);// go to AuthController.js execute login function
  router.post("/history", HistoryController.history);
  router.post("/refresh-token", AuthController.refreshToken);
  router.use(AuthMiddleWare.isAuth);// 
  return app.use("/", router);
}

module.exports = initAPIs;// module.exports make initAPIs become a library for other .js file use

/*
Question:
3. how to play song? what is my file?
*/