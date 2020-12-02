var fs = require('fs');
var file = require('file-system');
var files = fs.readdirSync('E:/readFile');
files.forEach(element => {
	var sql = "INSERT INTO tune (id, TuneName, file) VALUES ('Cardinal', 'Stavanger', 'Norway')";
    
});