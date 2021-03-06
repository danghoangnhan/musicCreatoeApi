const express = require('express'); // To include a module, use the require() function with the name of the module:
const app = express();
const bodyParser = require('body-parser');// analysis req.body
//require('dotenv').load();
require('dotenv').config({path:'api/.env'});
const initAPIs = require("./routes/routes");
require('dotenv').config();
const port = process.env.PORT; // in .env file PROT
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
initAPIs(app);

// let routes = require('./routes/routes');
// routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.listen(port, '0.0.0.0');// ex:(3000, '0.0.0.0':any outside server can connect)
console.log('server.js : RESTful API server started on: ' + port);