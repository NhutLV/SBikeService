'use strict'

var mongoose = require('mongoose');
var User = require('./history');


var rateSchema = new mongoose.Schema({
    id_history: { type :mongoose.Schema.Types.ObjectId, ref: 'HistoryMeta'},
    rating: String,
    comment: String
});

module.exports = mongoose.model('RateMeta', rateSchema);