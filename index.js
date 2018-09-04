'use strict'

const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
app.set('view engine', 'ejs');
app.set('port', port);


app.get('/', function(req, res) {
	app.use(express.static(path.join(__dirname + '/views')));
	res.render('pages/index');
});

app.listen(port, function() {
	console.log('Client Listening on port' + port);
})