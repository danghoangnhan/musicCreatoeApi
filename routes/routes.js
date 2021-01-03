'use strict';
module.exports = function(app) {
};
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");// direct to AuthMiddleware.js
const CreateController = require("../controllers/CreateController");// direct to CreateController.js
const EventController = require("../controllers/EventController");
const AuthController = require("../controllers/AuthController");
const HistoryController = require("../controllers/HistoryController");// n
const LastAddController = require("../controllers/LastAddController");// n
const MostPlayController = require("../controllers/MostPlayController");// n
const SongController = require("../controllers/SongController");
const tuneController = require("../controllers/tuneController");

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
  router.post("/login", AuthController.login);
  //router.post("/history", HistoryController.history);
  //router.post("/lastadd", LastAddController.lastAdd);
  //router.post("/mostplay", MostPlayController.mostPlay);
  router.post("/play", EventController.play);
  router.post("/playTune", EventController.playTune);
  // this user all song
  router.post("/getSong", EventController.getSong);
  router.post("/getTune", EventController.getTune);
  // this user all playlist
  router.post("/getPlayList", EventController.getPlaylist);
  router.post("/getPlayListSong", EventController.getPlaylistSong);
  // router.post("/createSong", EventController.createSong);
  router.post("/createPlayList", EventController.createPlaylist);
  router.post("/deleteSong", EventController.deleteSong);
  router.post("/deletePlayList", EventController.deletePlaylist);
  router.get("/DownloadTuneFile",tuneController.DownloadTuneFile);
  router.get("/DownloadSongFile",SongController.DownloadSongFile);
  router.post("/uploadSongFile", SongController.uploadSongFile);
  //router.use(AuthMiddleWare.isAuth);
  return app.use("/", router);
}
module.exports = initAPIs;