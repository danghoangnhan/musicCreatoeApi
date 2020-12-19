const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')


/**
 * controller getRandomPlaylist
 * @param {*} req 
 * @param {*} res 
 */

let getRandomPlaylist = async function (req, res) {
  try {
    let sql = 'SELECT distinct * from playlist order by rand('+id+') LIMIT 3;';
    const result = await db.dbQuery(sql);
    return res.status(200).json(result);
  }
  catch (error) {
     return res.status(403).json({
       message: error.message
    });
  }
}

  module.exports = {
    getRandomPlaylist: getRandomPlaylist
  }