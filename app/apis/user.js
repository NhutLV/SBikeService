'use strict'

var User = require('../models/user');
module.exports = function(app) {

    //sign up social facebook, gmail
    app.post('/users/sign-up-social', function(req,res){
        var fullname = req.body.full_name;
        var email = req.body.email;
        var access_token = req.body.access_token;
        var image_avatar_path = req.body.image_avatar_path; 
        
        console.log("access_token "+access_token);
        console.log("fullname "+fullname);
        console.log("email "+email);

        if(fullname === undefined || access_token === undefined){
            res.json({error : true, message : 'Thiếu tham số'});
        }else{
            User.findOne({access_token: access_token, type_user: 1}, function(err,user){
            if(err){
                res.json({error: true, message: 'Đăng nhập thất bại'});
            }else if(user ){
                res.json({error: false, data: user, message: 'Đăng nhập thành công'});
            }else{
                 User.create({
                    fullname : fullname,
                    email : email,
                    access_token : access_token,
                    type_user: 1,
                    image_avatar_path : image_avatar_path
                    }, function(err,data){
                if(err){
                    res.json({error: true, data: null, message: 'Đăng ký tài khoản thất bại'});
                }else{
                    res.json({error: false, data: data, message: 'Đăng ký tài khoản thành công'});
                }
            });
            }
        });
        }
    });

    //sign in social facebook, gmail
    app.post('/users/sign-in-social', function(req,res){
        var access_token = req.body.access_token;
        if(access_token === undefined){
            res.json({error: true, message: 'Thiếu tham số'});
        }else{
            User.findOne({access_token: access_token, type_user: 1}, function(err,data){
            if(err){
                res.json({error: true, message: 'Đăng nhập thất bại'});
            }else{
               res.json({error: false, data: data, message: 'Đăng nhập thành công'});
            }
        });
        }
    });

    //  get all user
    app.get('/users', function(req, res) {
        User.find(function(err, data) {
            if (err) {
                res.json({ error: true, data: null, message: 'Lấy thông tin người dùng bị lỗi' });
            } else {
                res.json({ error: false, data: data, message: 'Lấy thông tin người dùng thành công' });
            }
        });
    });

    //  get user by id
    app.get('/users/:id_user', function(req, res) {
        var id = req.params.id_user;

        User.find({ _id: id }, function(err, data) {
            if (err) {
                res.json({ error: true, data: null, message: 'Lấy thông tin người dùng bị lỗi' });
            } else if (data.length == 0) {
                res.json({ error: true, data: null, message: 'Người dùng không tồn tại' });
            } else {
                res.json({ error: false, data: data[0], message: 'Lấy thông tin người dùng thành công' });
            }
        });
    });

    //  change password
    app.post('/users/change-pass', function(req, res) {
        var id = req.body.id_user;
        var newPassword = req.body.new_pass;
        var oldPassword = req.body.old_pass;
        var currentPassword = req.body.current_pass;
        console.log("old_pass"+oldPassword);
        if (id === undefined || newPassword === undefined || 
            oldPassword === undefined || currentPassword === undefined) {
            res.json({ error: true, message: 'Thiếu tham số' });
        } else {
            var user = new User();
            user.password = currentPassword;
            var hash = user.generateHash(newPassword);
            if(!user.validPassword(oldPassword)){
                 res.json({ error: true, message: 'Mật khẩu cũ không đúng' });
            }else{
                User.findByIdAndUpdate(id, { password: hash },{new : true}, function(err, data) {
                if (err) {
                    res.json({ error: true, message: 'Đổi mật khẩu thất bại' });
                } else if (data === null) {
                    res.json({ error: true, message: 'Tài khoản không tồn tại' });
                } else {
                    res.json({ error: false, data: data, message: 'Đổi mật khẩu thành công' });
                }
            });
            }
        }
    });

    //  update coordinate biker
    app.post('/users/update/coordinate', function(req, res) {
        var id = req.body.id_user;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;

        if (id == undefined || latitude === undefined || longitude === undefined) {
            res.json({ error: true, message: 'Thiếu tham số' });
        } else {
            try {
                var lat = parseInt(latitude);
                var long = parseInt(longitude);
                User.findByIdAndUpdate(id, { latitude: lat, longitude: long }, function(err, data) {
                    if (err) {
                        res.json({ error: true, message: 'Cập nhật tọa độ thất bại' });
                    } else {
                        res.json({ error: false, message: 'Cập nhật tọa độ thành công' });
                    }
                });
            } catch (error) {
                res.json({ error: true, message: 'Tham số không đúng định dạng' });
            }
        }
    });

    //  update user by id
    app.post('/users/update/profile', function(req, res) {
        var id = req.body.id_user;
        var fullname = req.body.full_name;
        var numberphone = req.body.number_phone;
        if (id === undefined || fullname === undefined || numberphone === undefined ) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            User.findByIdAndUpdate(id, {
                fullname: fullname,
                number_phone: numberphone,
            }, { new : true } , function(err, data) {
                if (err) {
                    res.json({ error: true, data: null, message: 'Cập nhật thông tin thất bại' });
                } else if (data === null) {
                    res.json({ error: true, data: null, message: 'Tài khoản không tồn tại' })
                } else {
                    res.json({ error: false, data: data, message: 'Cập nhật thông tin thành công' });
                }
            });
        }
    });

    //  become a driver
    app.post('/users/is-driver', function(req, res) {
        var id = req.body.id_user;
        var is_driving = req.body.is_driving;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;

        if (id === undefined || is_driving === undefined) {
            res.json({ error: true, message: 'Thiếu tham số' });
        } else {
            if(parseInt(is_driving,10) > 0){
                User.findByIdAndUpdate(id,  {
                    longitude : parseFloat(longitude),
                    latitude : parseFloat(latitude),
                    is_driving: is_driving,
                },{new : true}, function(err, data) {
                if (err) {
                     res.json({ error: true, data:null, message: 'Cập nhật thông tin bị lỗi' });
                } else {
                    res.json({ error: false, data: data, message: 'Cập nhật thông tin thành công' });
                 }
             });
            }else{
                 console.log("0000000000");
                User.findByIdAndUpdate(id,  {
                is_driving: is_driving
                },{new : true}, function(err, data) {
                    if (err) {
                        res.json({ error: true, data:null, message: 'Cập nhật thông tin bị lỗi' });
                    } else {
                        res.json({ error: false, data: data, message: 'Cập nhật thông tin thành công' });
                    }
                });
            }
        }
    });

    //  update information for become driver
    app.post('/users/become-driver', function(req, res) {
        var id_user = req.body.id_user;
        // var identification_card_before_path = req.body.identification_card_before_path;
        // var identification_card_after_path = req.body.identification_card_after_path;
        var identification_number = req.body.identification_number;
        var identification_place = req.body.identification_place;
        var identification_date = req.body.identification_date;
        // var driving_license_before_path = req.body.driving_license_before_path;
        // var driving_license_after_path = driving_license_after_path;
        var driving_license_number = req.body.driving_license_number;
        var driving_license_seri =  req.body.driving_license_seri;
        // var card_number_plate_path = req.body.card_number_plate_path;
        var number_card = req.body.number_card;
        var is_become = req.body.is_become;

        if (id_user === undefined || identification_number === undefined ||
            identification_place === undefined || identification_date === undefined ||
            driving_license_number === undefined || driving_license_seri === undefined ||
            number_card === undefined || is_become === undefined) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            User.findByIdAndUpdate(id_user, {
                // identification_card_before_path: identification_card_before_path,
                // identification_card_after_path: identification_card_after_path,
                // identification_number: identification_card_before_path,
                // identification_number: driving_license_after_path,
                identification_place: identification_place,
                identification_number: identification_number,
                identification_date: identification_date,
                driving_license_number: driving_license_number,
                driving_license_seri: driving_license_seri,
                number_card: number_card,
                is_become: is_become
            },{ new: true }, function(err, data) {
                if (err) {
                    console.log(err);
                    res.json({ error: true, data: null, message: 'Cập nhật thông tin bị lỗi'});
                } else if (data === null) {
                    console.log('dataaaaa '+data);
                    res.json({ error: true, data: null, message: 'Tài khoản không tồn tại' });
                } else {
                    res.json({ error: false, data: data, message: 'Cập nhật thông tin thành công' });
                }
            });
        }
    });

    //  get users by radius
    app.post('/users/radius', function(req, res) {
        var radius = req.body.radius;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        console.log("latitude "+latitude);
        console.log("longitude "+longitude);
        if (radius === undefined ||  latitude === undefined ||
            longitude === undefined) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            var result = [];
            User.find({ 
               is_driving: 1,
               is_approved : 1
            }, function(err, data) {
            if (err) {
                res.json({ error: true, data: null, message: 'Lấy thông tin người dùng bị lỗi' });
            }else {
                for (var i = 0; i < data.length; i++) {
                    var distance = getDistance(latitude,longitude,data[i].latitude,data[i].longitude);
                    console.log("Distance "+distance);
                    if (distance < radius) {
                         result.push(data[i]);
                    }
                }
                res.json({ error: false, data: result, message: 'Lấy thông tin thành công' });
            }
        });
        }
    });

    var rad = function(x) {
    return x * Math.PI / 180;
    };

    var getDistance = function(lat1, lng1, lat2, lng2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) * Math.cos(rad(lat2))*
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
    };
}