'use strict'

var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    id_user: mongoose.Schema.Types.ObjectId,
    id_biker: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model('HistoryMeta', historySchema);