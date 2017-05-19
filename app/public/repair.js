'use strict'

var Repair = require('../models/repair');

module.exports = function(app) {

 //  get Repair by id
    app.get('/repair', function(req, res) {

        Repair.find()
        .populate('id_user_created')
        .sort({timestamp_created: -1})
        .exec(function(err, data) {
            if (err) {
                res.end();
            } else {
                res.render("repair",{data: data});
            }
        });
    });

}