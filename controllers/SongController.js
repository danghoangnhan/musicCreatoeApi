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
<<<<<<< Updated upstream
    let sql = 'SELECT distinct * from playlist order by rand('+id+') LIMIT 3;';
    const result = await db.dbQuery(sql);
    return res.status(200).json(result);
=======
    let sql = 'SELECT id, songName, tune_set FROM song';
    /*
    console.log('1');
    console.log(await dbQuery(sql)); // didn't callback yet next line is execute
    console.log('2');
    */
    return res.status(200).json({
        message: await dbQuery(sql),
    });
>>>>>>> Stashed changes
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