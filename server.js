'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var api = require('./app/api/index.js');

var app = express();
require('dotenv').load();

var historySchema = new Schema({
    term: String,
    when: String
});

var History = mongoose.model('History',historySchema);

mongoose.connect(process.env.MONGODB_URI);

app.use('/public', express.static(process.cwd() + '/public'));

routes(app);
api(app, History);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});