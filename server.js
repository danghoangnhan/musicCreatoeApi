const express = require('express'); // To include a module, use the require() function with the name of the module:
const app = express();
const bodyParser = require('body-parser');
//require('dotenv').load();
require('dotenv').config({path:'api/.env'});
const initAPIs = require("./routes/routes");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());
initAPIs(app);

// let routes = require('./routes/routes');
// routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, '0.0.0.0');

console.log('RESTful API server started on: ' + port);