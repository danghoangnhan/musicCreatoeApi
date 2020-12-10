const db = require('./api/db')
const path = require('path');
var fs = require('fs');
var file = require('file-system');
var files = fs.readdirSync('E:/musicCreatoeApi/music/song');
for(var i=0;i<files.length;i++){ 
    var sql = "INSERT INTO `song` VALUES (" + i + ",'" + path.parse(files[i]).name +"', '140.136.151.130:80/music/song/"+files[i]+"')";
    db.query(sql, function (error, results, fields) {
        if (error) {
            console.log('[UPDATE ERROR] - ', error.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows', results.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
};

