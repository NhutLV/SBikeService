'use strict'

var mongoose = require('mongoose');
var User = require('./user');

var historySchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.ObjectId, ref: 'UserMeta' },
    id_biker: { type: mongoose.Schema.ObjectId, ref: 'UserMeta' },
    time_call: String,
    place_from: String,
    latitude_from: Number,
    longitude_from: Number,
    place_to: String,
    latitude_to: String,
    longitude_to: String,
    distance: Number,
    price: Number,
    time_spend: Number,
    token_fcm : String,
});

module.exports = mongoose.model('HistoryMeta', historySchema);