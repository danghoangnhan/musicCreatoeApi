const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

/**
 * controller mostPlay
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
let mostPlay = async function (req, res){
    try {
        // playlist(listId, userId, playListName)
        // song(songId, listId, songName, tuneSet, duration, playCount, playTime, createTime, path)
        let sql = 'SELECT * FROM song join playlist on song.listId = playlist.listId\
                    WHERE userId = ' + req.body.userid + ' \
                    ORDER BY playCount DESC;';
        // result is .json file result[0]{"key": value, "key": value, "key": value, ......}
        var result = await db.dbQuery(sql);// connect to db
        console.log(result);
        // if query has no result = 'Invalid login.'
        if(result.length==0){
            return res.status(403).json({
            message: 'NO Record Found'
            });
        }
        else{return res.status(200).send(result);}
    }
    catch(error){
        throw error;
    }
}

function dbQuery(databaseQuery) {
    return new Promise(data => {
        db.query(databaseQuery, function (error, result) { // change db->connection for your code
        if (error) {
            console.log(error);
            throw error;
        }
        try {
            console.log(result);
            data(result);
        }
        catch (error) {
            data({});
            throw error;
            }
        });
    });
}

module.exports = {
    mostPlay: mostPlay
}