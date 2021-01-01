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
  debug(req.query);
  try {
    let sql = 'SELECT distinct * from playlist where id='+req.query.id;
    const result = await db.dbQuery(sql);
    return res.status(200).json(result);
  }
  catch (error) {
     return res.status(403).json({
       message: error.message
    });
  }
}
let DownloadSongFile = async function (req, res) {
  try {    
    debug(req.query);
    let sql = 'SELECT * FROM song WHERE songId = ' + req.query.songId;
    var result = await db.dbQuery(sql);
    debug(sql);
    console.log(result);
    const file = `.././musicCreatoeApi/music/song/`+result[0].songName+`.mid`;
    return res.status(200).download(file);
  } catch (error) {
    debug(error);
    return res.status(501).json(error);
  }
};
// what this ?
/**
 * controller getsong
 * @param {*} req 
 * @param {*} res 
 */
  module.exports = {
    DownloadSongFile : DownloadSongFile
  }