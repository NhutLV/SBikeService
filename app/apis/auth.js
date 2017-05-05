'use strict'

var User = require('../models/user');

module.exports = function(app, passport) {

    //  local sign-in
    app.post('/user/sign-in', function(req, res, next) {
        passport.authenticate('local-sign-in', function(err, user, info) {
            if (err) {
                res.json({ error: true, data: null, message: 'Đăng nhập thất bại' });
            } else if (!user) {
                var msg = req.flash('message');
                res.json({ error: true, data: null, message: msg[0] });
            } else {
                res.json({ error: false, data: user, message: 'Đăng nhập thành công' });
            }
        })(req, res, next);
    });

    //  local sign-up
    app.post('/user/sign-up', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                res.json({ error: true, data: null, message: 'Đăng kí thất bại' });
            } else if (!user) {
                var msg = req.flash('message');
                res.json({ error: true, data: null, message: msg[0] });
            } else {
                res.json({ error: false, data: user, message: 'Đăng kí thành công' });
            }
        })(req, res, next);
    });
}