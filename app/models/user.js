'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    access_token: String,
    image_avatar_path: String,
    latitude: Number,
    longitude: Number,
    number_phone: String,
    identification_number : String,
    identification_place : String,
    identification_date : String,
    identification_before_path: String,
    identification_after_path: String,
    driving_license_number : String,
    driving_license_seri : String,
    number_card: String,
    type_user: Number,
    is_driving: Number,
    is_approved: Number,
    is_become: Number,
    device : String,
    token_fcm: String
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