'use strict'

var mongoose = require('mongoose');

var priceListSchema = new mongoose.Schema({
    first_price: Number,
    second_price: Number,
    fee : Number,
    date_created : Date,
    date_updated : Date
});

module.exports = mongoose.model('PriceListMeta', priceListSchema);