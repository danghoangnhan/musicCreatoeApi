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
const SongController = require("../controllers/SongController");// direct to SongController.js

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
  router.post("/history", HistoryController.history);
  router.post("/lastadd", LastAddController.lastAdd);
  router.post("/mostplay", MostPlayController.mostPlay);
  router.post("/play", EventController.play);
  router.post("/playTune", EventController.playTune);
  // this user all song
  router.post("/getSong", EventController.getSong);
  router.post("/getTune", EventController.getTune);
  // this user all playlist
  router.post("/getPlaylist", EventController.getPlaylist);
  router.post("/getPlaylistSong", EventController.getPlaylistSong);
  router.post("/createSong", EventController.createSong);
  router.post("/createPlaylist", EventController.createPlaylist);
  router.post("/deleteSong", EventController.deleteSong);
  router.post("/deletePlaylist", EventController.deletePlaylist);
  router.use(AuthMiddleWare.isAuth);
  return app.use("/", router);
}
module.exports = initAPIs;