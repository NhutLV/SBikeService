'use strict'

var mongoose = require('mongoose');

var RepairSchema = new mongoose.Schema({
    name: String,
    number_phone: String,
    address: String,
    latitude: Number,
    longitude: Number,
    type_repair: Number,
    id_user_created: mongoose.SchemaTypes.ObjectId,
    timestamp_created: Date,
    timestamp_updated: Date
});

module.exports = mongoose.model('RepairMeta', RepairSchema);