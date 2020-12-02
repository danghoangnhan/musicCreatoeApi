const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')

/**
 * controller lastadd
 * @param {*} req 
 * @param {*} res 
 */
// according Postman POST [localhost:3000/login] Send Body [account: "user1", password: "123456"]
// assume var req  = [head = '......', body = {account: "user1", password: "123456"}]
// res = res.status(403).json({message: 'Invalid login.'});
// res is req return
let lastadd = async function (req, res){
    try {
        let sql = 'SELECT * FROM Song ORDER BY createtime DESC';
        // result is .json file result[0]{"key": value, "key": value, "key": value, ......}
        var result = await dbQuery(sql);// connect to db
        console.log(result);
        // if query has no result = 'Invalid login.'
        if(result.length==0){
            return res.status(403).json({
            message: 'NO Record Found'
            });
        }
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
    lastadd: lastadd
}