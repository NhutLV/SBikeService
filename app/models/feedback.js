'use strict'

var mongoose = require('mongoose');

var feedBackSchema = new mongoose.Schema({
    id_user: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String
});

module.exports = mongoose.model('FeedBackMeta', feedBackSchema);