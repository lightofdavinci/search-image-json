'use strict';

var api = require('../api/index.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function (app) {
    var historySchema = new Schema({
    term: String,
    when: String
});

    var History = mongoose.model('History',historySchema);

    mongoose.connect(process.env.MONGODB_URI);
    api(app,History);
};