
//const db = require('./api/db')
const path = require('path');
var fs = require('fs');
var file = require('file-system');
var files = fs.readdirSync('E:/GitHub/musicCreatoeApi/music/song');
const { getAudioDurationInSeconds } = require('get-audio-duration');


 


for(var i=0;i<files.length;i++){ 
getAudioDurationInSeconds('E:/GitHub/musicCreatoeApi/music/song/'+files[i]).then((duration) => {
  console.log(duration);
});
    };

 
