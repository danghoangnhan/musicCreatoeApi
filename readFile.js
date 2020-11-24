const path = require('path');
var fs = require('fs');
var file = require('file-system');
var files = fs.readdirSync('E:/readFile');
for(var i=0;i<files.length;i++){ 
    var sql = "INSERT INTO `tune` VALUES (" + i + ",'" + path.parse(files[i]).name +"', '140.136.151.130:80/music/tune/"+files[i]+"')";
    console.log(sql);
};