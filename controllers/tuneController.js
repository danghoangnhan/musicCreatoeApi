
const debug = console.log.bind(console);
const db = require('./../api/db');
var path = require('path');
var mime = require('mime');
var fs = require('fs');

let DownloadTuneFile = async function (req, res) {
    try {    
      let sql = 'SELECT * FROM tune WHERE tuneId = ' + req.query.tuneId;
      var result = await db.dbQuery(sql);
      const file = ".././musicCreatoeApi/music/tune/output/"+result[0].tuneName+".mp3";

      // var filename = path.basename(file);
      // var mimetype = mime.lookup(file);

      // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      // res.setHeader('Content-type', mimetype);
    
      // var filestream = fs.createReadStream(file);
      // filestream.pipe(res);
      return res.download(file);
    } catch (error) {
      return res.status(501).json(error);
    }
  };
/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
module.exports = {
    DownloadTuneFile: DownloadTuneFile
  }
