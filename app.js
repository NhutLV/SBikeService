'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/configuration').config;
var mongoose = require('mongoose');
var database = require('./config/database');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var app = express();
var port = config.PORT;
mongoose.Promise = global.Promise;

//  mongodb
mongoose.connect(database.durl);

//  middle ware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//  api
require('./app/apis/passport')(passport);
require('./app/apis/auth')(app, passport);
require('./app/apis/store')(app);
require('./app/apis/repairor')(app);
require('./app/apis/user')(app);
require('./app/apis/feedback')(app);
require('./app/apis/history')(app);
require('./app/apis/favoritebiker')(app);


app.listen(port, function(err) {
    if (err) {
        console.log('Start server error');
    } else {
        console.log('App listening on port: ' + port);
    }
});