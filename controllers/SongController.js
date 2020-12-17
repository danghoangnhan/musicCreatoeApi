const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

// what this ?
/**
 * controller getsong
 * @param {*} req 
 * @param {*} res 
 */
let getsong = async function (req, res) {
  try {
    let sql = 'SELECT id, songName, tune_set FROM song';
    return res.status(200).json({
        message: await dbQuery(sql),
    });
  }
  catch(error){
    throw error;
  }
}

let getPlaylist = async function (req, res) {
  debug(req);
  try {
    let sql = 'SELECT distinct * from playlist where id='+req;
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
    getsong: getsong,
    getPlaylist: getPlaylist
  }