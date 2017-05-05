'use strict'

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(id, cb) {
        User.findById(id, function(err, user) {
            cb(err, user)
        });
    });

    //  sign-in
    passport.use('local-sign-in', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        console.log('zzz');
        var email = req.body.email;
        var password = req.body.password;

        if (email === undefined || password === undefined) {
            console.log('aaa');
            return done(null, false, req.flash('message', 'Thiếu tham số'));
        }

        User.findOne({ 'email': email }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('message', 'Tài khoản không tồn tại'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('message', 'Sai mật khẩu'));
            }
            return done(null, user);
        });
    }));

    //  sign-up
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        var fullname = req.body.full_name;
        var email = req.body.email;
        var numberphone = req.body.number_phone;
        var password = req.body.password;

        if (fullname === undefined || email === undefined || numberphone === undefined || password === undefined) {
            return done(null, false, req.flash('message', 'Thiếu tham số'));
        }

        User.findOne({ 'email': email }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('message', 'Người dùng đã tồn tại'));
            }

            var _user = new User();
            _user.email = email;
            _user.password = _user.generateHash(password);
            _user.fullname = fullname;
            _user.number_phone = numberphone;
            _user.access_token = '';
            _user.image_avatar_path = '';
            _user.latitude = null;
            _user.longitude = null;
            _user.identification_before_path = '';
            _user.identification_after_path = '';
            _user.driving_license_before_path = '';
            _user.driving_license_after_path = '';
            _user.car_number_plate_path = '';
            _user.is_driving = 0;
            _user.is_approved = 0;
            _user.is_become = 0;           
            
            _user.save(function(err) {
                if (err) {
                    return done(null, false, req.flash('message', 'Đăng kí thất bại'));
                } else {
                    return done(null, _user);
                }
            });
        });
    }));
}