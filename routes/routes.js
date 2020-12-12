'use strict';
module.exports = function(app) {
};
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");// direct to AuthMiddleware.js
const CreateController = require("../controllers/CreateController");// direct to CreateController.js
const EventController = require("../controllers/EventController");// direct to EventController.js
const AuthController = require("../controllers/AuthController");// direct to AuthController.js
const HistoryController = require("../controllers/HistoryController");// direct to HistoryController.js
const LastAddController = require("../controllers/LastAddController");// direct to LastAddController.js
const MostPlayController = require("../controllers/MostPlayController");// direct to MostPlayController.js



/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
  // when user click login button
  // router.post(get data) get the response(ex:140.136.151.130.3000/login) from app
  // (active, which file . which movement)

  // All Page
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);// go to AuthController.js execute login function
  router.post("/create", CreateController.create);
  router.post("/history", HistoryController.history);
  router.post("/lastadd", LastAddController.lastadd);
  router.post("/mostplay", MostPlayController.mostplay);
  //router.post("/refresh-token", AuthController.refreshToken);
  router.use(AuthMiddleWare.isAuth);// 

  // All Event
  router.post("/play", EventController.play);
  return app.use("/", router);
}

module.exports = initAPIs;// module.exports make initAPIs become a library for other .js file use

/*
Question:
3. how to play song? what is my file?
*/