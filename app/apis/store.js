var mongoose = require('mongoose');
var RepairMeta = require('../models/repair');


module.exports = function(app) {
    //  register store
    app.post('/store/register', function(req, res) {
        if (req.body.name === undefined) {
            res.status(500).send({ error: 'Missing name' });
            return;
        } else if (req.body.address === undefined) {
            res.status(500).send({ error: 'Missing address' });
            return;
        } else if (req.body.numberPhone === undefined) {
            res.status(500).send({ error: 'Missing numberphone' });
            return;
        }
        var store = {
            name: req.body.name,
            address: req.body.address,
            numberPhone: req.body.numberPhone,
            type: 0
        };
        RepairMeta.count({ numberPhone: store.numberPhone, type: 0 }, function(err, count) {
            if (count > 0) {
                res.status(500).send({ error: 'Store is exist' });
                return;
            } else {
                RepairMeta.create(store, function(err, data) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        res.send({ message: 'Register successful', data: data });
                    }
                });
            }
        });
    });

    //  get all store
    app.get('/store', function(req, res) {
        RepairMeta.find({ type: 0 }, function(err, data) {
            if (err) {
                res.status(500).send({ error: 'Query error' });
                return;
            } else {
                res.send({ store: data });
            }
        });
    });

    // get store by id
    app.get('/store/:id', function(req, res) {
        RepairMeta.findById(req.params.id, function(err, data) {
            if (err) {
                res.status(500).send({ error: 'Query error' });
                return;
            } else {
                res.send({ store: data });
            }
        });
    });
}