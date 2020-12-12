const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

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
 * controller create
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
let create = async function (req, res){
    try {
        // Song(id, songname, tuneset, playcount, playtime, createtime)
        // INSERT INTO customers (Name, Address, Phone)
        // VALUES ('姓名XXX', '地址XXX', '電話XXX');
        let sql = 'INSERT INTO Song (songname, tuneset, playcount, createtime) \
        VALUES (' + req.body.songname + ', ' + req.body.tuneset + 
        ', ' + 0 + ', ' + req.body.songname + ', ' + getDateTime() + ')';
        // result is .json file result[0]{"key": value, "key": value, "key": value, ......}
        db.query(sql, function (err, result) {
            if (err) throw err;
        });
        let sql1 = 'SELECT * FROM Song ORDER BY createtime DESC LIMIT 1';
        var result = await dbQuery(sql1);// connect to db
        return res.status(200).send(result);
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
    create: create
}