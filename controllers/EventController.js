const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

/**
 * controller play
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
let play = async function (req, res) {
    try {
        let sql = 'SELECT path FROM song WHERE id = "' + req.body.id + '"';
        const tempt =await dbQuery(sql);
        return res.status(200).json({
            song:tempt
        });
    }
    catch(error){
        return res.status(403).json({
            message: error
        });
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
            data(error);
            throw error;
            }
        });
    });
}

module.exports = {
    play: play
}