'use strict';

var api = require('../api/index.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function (app) {
    var recent = new Schema({
    term: String,
    when: String
});

    var History = mongoose.model('History',recent);

    mongoose.connect(process.env.MONGODB_URI);
    api(app,History);
};