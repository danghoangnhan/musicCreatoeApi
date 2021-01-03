
const path = require('path');
var fs = require('fs');
const { exec } = require('child_process');
var file = require('file-system');
console.log('Starting MIDI to MP3 conversion...');
console.time('conversion');
var files = fs.readdirSync('E:\\GitHub\\musicCreatoeApi\\music\\song');
var files = fs.readdirSync('./input');
for(var i=0;i<files.length;i++){ 
var execute= 'timidity ./input/'+files[i]+' -Ow -o - | lame - -b 64 ./output/'+files[i].split('.').slice(0, -1).join('.')+'.mp3';
//     exec(execute, (err, stdout, stderr) => {
//   if (err) {
//     console.err("Error: " + err);
//     return;
//   }

//   console.timeEnd('conversion');

//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
console.log(execute);
}




