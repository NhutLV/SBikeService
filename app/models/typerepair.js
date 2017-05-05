'use strict'

var mongoose = require('mongoose');

var typeRepairSchema = new mongoose.Schema({
    id_type: Number,
    name_type: String
});

module.exports = mongoose.model('TypeRepairMeta', typeRepairSchema);