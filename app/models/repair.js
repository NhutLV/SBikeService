'use strict'

var mongoose = require('mongoose');
var user =require("./user");

var RepairSchema = new mongoose.Schema({
    name: String,
    number_phone: String,
    address: String,
    latitude: Number,
    longitude: Number,
    type_repair: Number,
    id_user_created: {type : mongoose.SchemaTypes.ObjectId, ref : 'UserMeta'},
    time_open : String,
    time_close : String,
    timestamp_created: Date,
    timestamp_updated: Date
});

module.exports = mongoose.model('RepairMeta', RepairSchema);