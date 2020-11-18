'use strict';
module.exports = function(app) {
  // let productsCtrl = require('./../controllers/ProductsController');
  // let accountsCtrl = require('./../controllers/AccountController');
  // let vehiclesCtrl = require('./../controllers/VehiclesController');
  // let commandCtrl = require('./../controllers/CommandController');

  // todoList Routes
  // app.route('/products')
  //   .get(productsCtrl.get)
  //   .post(productsCtrl.store);


  //   app.route('/account')
  //   .get(accountsCtrl.get)
  //   .put(accountsCtrl.update)
  //   .delete(accountsCtrl.delete);

  //   app.route('/command')
  //   .get(commandCtrl.get)
  //   .put(commandCtrl.update)
  //   .delete(commandCtrl.delete);

  //   app.route('vehicle')
  //   .get(vehiclesCtrl.get)
  //   .put(vehiclesCtrl.update)
  //   .delete(vehiclesCtrl.delete);
};
/**
 * Created by trungquandev.com's author on 16/10/2019.
 * src/routes/api.js
 */
const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
//const FriendController = require("../controllers/FriendController");
  // let productsCtrl = require('./../controllers/ProductsController');
  let accountsCtrl = require('./../controllers/AccountController');
  let vehiclesCtrl = require('./../controllers/VehiclesController');
  let commandCtrl = require('./../controllers/CommandController');

/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
  router.post("/login", AuthController.login);
  router.post("/refresh-token", AuthController.refreshToken);

  // Sử dụng authMiddleware.isAuth trước những api cần xác thực
  router.use(AuthMiddleWare.isAuth);
  // List Protect APIs:
  //router.get("/friends", FriendController.friendLists);
  // router.get("/example-protect-api", ExampleController.someAction);
  router.get("/vehicle",vehiclesCtrl.get);
  router.get("/command",commandCtrl.get);
  router.get("/account",accountsCtrl.get);


  return app.use("/", router);
}

module.exports = initAPIs;