'use strict';
module.exports = function(app) {
};
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");



/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
  // router.post(get data) get the response(ex:140.136.1501.130.3000/login) from app
  // (active, which file . which movement)
  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);

  router.use(AuthMiddleWare.isAuth);



  return app.use("/", router);
}

module.exports = initAPIs;