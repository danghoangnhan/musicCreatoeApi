'use strict';
module.exports = function(app) {
};
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
<<<<<<< Updated upstream
=======
//const FriendController = require("../controllers/FriendController");
  // let productsCtrl = require('./../controllers/ProductsController');
  let accountsCtrl = require('./../controllers/AccountController');
  // let vehiclesCtrl = require('./../controllers/VehiclesController');
  //let commandCtrl = require('./../controllers/CommandController');
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
  // List Protect APIs:
  //router.get("/friends", FriendController.friendLists);
  //router.get("/example-protect-api", ExampleController.someAction);
  //router.get("/vehicle",vehiclesCtrl.get);
  //router.get("/command",commandCtrl.get);
  router.get("/account", accountsCtrl.get);// where is accountsCtrl?  accountsCtrl.get = ?
>>>>>>> Stashed changes


  return app.use("/", router);
}

module.exports = initAPIs;