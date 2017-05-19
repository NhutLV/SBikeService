'use strict'

var History = require('../models/history');

module.exports = function(app) {
//  get history by id
    app.get('/history', function(req, res) {
        History.find()
        .populate('id_biker')
        .populate('id_user')
        .sort({time_call: -1})
        .exec(function(err, data) {
            if (err) {
                res.end();
            } else {
                res.render("history",{data: data});
            }
        });
    });

}