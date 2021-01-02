
const debug = console.log.bind(console);
const util = require('util')
const db = require('./../api/db')

let DownloadTuneFile = async function (req, res) {
    try {    
      debug(req.query);
      let sql = 'SELECT * FROM tune WHERE tuneId = ' + req.query.tuneId;
      var result = await db.dbQuery(sql);
      debug(sql);
      console.log(result);
      // tune(tuneId, tuneName, path)
      // result[0] = [{tuneId:value, tuneName:value, path:value}, {}, {}]
      //const file = `${__dirname}/upload-folder/`+result.tuneName+`.mid`;
      const file = `.././musicCreatoeApi/music/tune/`+result[0].tuneName+`.mid`;
      return res.status(200).download(file);
    } catch (error) {
      debug(error);
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
