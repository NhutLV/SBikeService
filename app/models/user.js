'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    gender: Number,
    access_token: String,
    image_avatar_path: String,
    age: Number,
    latitude: Number,
    longitude: Number,
    number_phone: String,
    identification_number : String,
    identification_place : String,
    identification_date : String,
    identification_before_path: String,
    identification_after_path: String,
    driving_license_before_path: String,
    driving_license_after_path: String,
    driving_license_number : String,
    driving_license_seri : String,
    number_card: String,
    card_number_plate_path: String,
    is_driving: Number,
    number_favorite: Number,
    numer_not_favorite: Number,
    is_approved: Number,
    is_become: Number
});

//  encrypt password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//  check password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('UserMeta', UserSchema);