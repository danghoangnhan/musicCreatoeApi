const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const util = require('util')
const mysql = require('mysql')
const db = require('./../api/db')



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
    
}