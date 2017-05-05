'use strict'

var mongoose = require('mongoose');
var User = require('./user');

var favoriteBiker = new mongoose.Schema({
    id_user: mongoose.Schema.Types.ObjectId,
    id_biker: { type: mongoose.Schema.ObjectId, ref: 'UserMeta' },
    is_favorite: Number,
    timestamp_created: Date,
    timestamp_updated: Date
});

module.exports = mongoose.model('FavoriteBikerMeta', favoriteBiker);