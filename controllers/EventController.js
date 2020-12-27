const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db');
const { dbQuery } = require("./../api/db");

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}


/**
 * controller createSong
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
let createSong = async function (req, res){
    try {
        // INSERT INTO customers (Name, Address, Phone)
        // VALUES ('姓名XXX', '地址XXX', '電話XXX');
        //song(songId, listId, songName, tuneSet, playCount(int), playTime, createTime, path)
        let sql = 'INSERT INTO song (listId, songName, tuneSet, playCount, createTime, path) \
        VALUES ("' + req.body.listid + '", "' + req.body.songname + '", "' + req.body.tuneset
        + '", ' + req.body.playcount + ', "' + getDateTime() + '", "' + req.body.path + '");';
        // result is .json file result[0]{"key": value, "key": value, "key": value, ......}
        var result = await db.dbQuery(sql);
        return res.status(200).json({
            message: 'insert song successful',
        });
        // let sql1 = 'SELECT * FROM song ORDER BY createTime DESC LIMIT 1;';
        // var result = await dbQuery(sql1);// connect to db
        // return res.status(200).send(result);
    }
    catch(error){
        throw error;
    }
}

/**
 * controller createPlaylist
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return

// req userid, playlistname
let createPlaylist = async function (req, res){
    try {
        //playlist(listId, userId, playListName)
        let sql = 'INSERT INTO playlist (userId, playListName) \
        VALUES (' + req.body.userid + ', "' + req.body.playlistname + '");';
        // result is .json file result[0]{"key": value, "key": value, "key": value, ......}
        var result = await db.dbQuery(sql);
        return res.status(200).json({
            message: 'insert playlist successful',
        });
        // let sql1 = 'SELECT * FROM song ORDER BY createTime DESC LIMIT 1;';
        // var result = await dbQuery(sql1);// connect to db
        // return res.status(200).send(result);
    }
    catch(error){
        throw error;
    }
}

/**
 * controller deleteSong
 * @param {*} req 
 * @param {*} res 
 */
// POST req song(id)
let deleteSong = async function (req, res) {
    try {
        // playlist(listId, userId, playListName)
        // song(songId, listId, songName, tuneSet, duration, playCount, playTime, createTime, path)
        let sql = 'DELETE FROM song \
                    WHERE songId = ' + req.body.songid + ';';
        var result = await db.dbQuery(sql);
        return res.status(200).json({
            message: 'delete song successful',
        });
    }
    catch(error){
        throw error;
    }
}

/**
 * controller deletePlaylist
 * @param {*} req 
 * @param {*} res 
 */
// POST req song(id, songName, tune_set)
let deletePlaylist = async function (req, res) {
    try {
        // playlist(listId, userId, playListName)
        // song(songId, listId, songName, tuneSet, duration, playCount, playTime, createTime, path)
        let sql = 'DELETE FROM playlist\
                    WHERE listId = ' + req.body.listid + ';';
        var result = await db.dbQuery(sql);
        return res.status(200).json({
            message: 'delete playlist successful',
        });
    }
    catch(error){
        throw error;
    }
}

/**
 * controller play
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
// POST req song(id) | res song(*)
let play = async function (req, res) {
    try {
        debug(req.query);
            const result =  await db.dbQuery('SELECT * FROM song WHERE songId = ' + req.body.songId);
                            await db.dbQuery('UPDATE song SET playCount = ' + result[0].playCount + ' WHERE songId = ' + req.body.songId);
                            await db.dbQuery('UPDATE song SET playTime = "' + getDateTime() + '" WHERE songId = ' + req.body.songId);
            return res.status(200).json({result});
    }
    catch(error){
        return res.status(403).json({
            message: error.message
        });
    }
}

/**
 * controller playTune
 * @param {*} req 
 * @param {*} res 
 */
let playTune = async function (req, res) {
    try {
        debug(req.query);
            const result =  await db.dbQuery('SELECT * FROM tune WHERE tuneId = ' + req.body.tuneId);
            return res.status(200).json({result});
    }
    catch(error){
        return res.status(403).json({
            message: error.message
        });
    }
}

/**
 * controller getSong
 * @param {*} req 
 * @param {*} res 
 */

let getSong = async function (req, res) {
    try {
        // playlist(listId, userId, playListName)
        // song(songId, listId, songName, tuneSet, duration, playCount, playTime, createTime, path)
        let sql = 'SELECT * FROM song join playlist on song.listId = playlist.listId\
                    WHERE userId = ' + req.body.userid;
        const tempt = await db.dbQuery(sql);
        return res.status(200).json({
            message: tempt
        });
    }
    catch(error){
        return res.status(403).json({
            message: error
        });
    }
}

/**
 * controller getPlaylist
 * @param {*} req 
 * @param {*} res 
 */
// POST req user(id) | res playlist(list_id)
// playlist(listId, userId, playListName)
let getPlaylist = async function (req, res) {
    
    try {
        debug(req.body);
        let sql = 'SELECT * FROM playlist WHERE userId = "' + req.body.userid + '";';
        console.log(sql);
        const tempt = await db.dbQuery(sql);
        debug(tempt)
        return res.status(200).json(tempt);
    }
    catch(error){
        return res.status(403).json({
            message: error
        });
    }
}

/**
 * controller getPlaylistSong
 * @param {*} req 
 * @param {*} res 
 */
// POST req user(id, listId) | res playlist(songId)
let getPlaylistSong = async function (req, res) {
    try {
        // playlist(listId, userId, playListName)
        // song(songId, listId, songName, tuneSet, duration, playCount, playTime, createTime, path)
        let sql = 'SELECT * FROM song join playlist on song.listId = playlist.listId\
                    WHERE userId = ' + req.body.userid + ' and playlist.listId = ' 
                    + req.body.listid + ';';
        const tempt = await db.dbQuery(sql);
        return res.status(200).json({
            message: tempt
        });
    }
    catch(error){
        return res.status(403).json({
            message: error
        });
    }
}
// SELECT t1.col ， t3.col FROM table1 join table2 ON table1.primarykey = table2.foreignkey
//                                   join table3 ON table2.primarykey = table3.foreignkey

/**
 * controller getTune
 * @param {*} req 
 * @param {*} res 
 */

let getTune = async function (req, res) {
    try {
        // tune(tuneId, tuneName, path)
        debug(req.body);

        let sql = 'SELECT * FROM tune WHERE tuneId = ' + req.body.tuneId;
        const tempt = await db.dbQuery(sql);
        return res.status(200).json({
            tempt
        });
    }
    catch(error){
        return res.status(403).json({
            message: error
        });
    }
}

module.exports = {
    createSong: createSong,
    createPlaylist: createPlaylist,
    deleteSong: deleteSong,
    deletePlaylist: deletePlaylist,
    play: play,
    playTune: playTune,
    getSong: getSong,
    getPlaylist: getPlaylist,
    getPlaylistSong: getPlaylistSong,
    getTune: getTune
}