'use strict'

var User = require('../models/user');
var gcm = require('node-gcm');
var gcm_message = new gcm.Message();
module.exports = function(app) {

app.get('/become', function(req, res){
        User.find({
            is_become :1,
        },function(err, data) {
            if (err) {
                res.end();
            } else {
                res.render("list",{data:data});
            }
        });
    });

    app.get('/index', function(req, res){
        User.find(function(err, data) {
            if (err) {
                res.end();
            } else {
                res.render("index",{data:data});
            }
        });
    });

    //  get user by id
    app.get('/view/:id_user', function(req, res) {
        var id = req.params.id_user;
        User.findOne({ _id: id }, function(err, data) {
            if (err) {
                res.end();
            } else if (data.length == 0) {
                res.end("Người dùng không tồn tại")
            } else {
                console.log(data);
                res.render("view",{data: data});
            }
        });
    });


     app.post("/approved", function(req,res){

        var is_approved = req.body.is_approved;
        var id_user = req.body.id_user;
        var token_gcm = req.body.token_gcm;
        console.log("appproved "+is_approved);
        console.log("id_user "+id_user);
        var sender = new gcm.Sender('AIzaSyBGmoce6oxJO0wPsIhSeNpBJnWr_tcsVp0');
        var message = "";
        if(is_approved == 1){
            User.findByIdAndUpdate(id_user,{ is_approved : 1},{new : true}, function(err, data) {
                if (err) {
                    res.end();
                }else {
                    console.log("Approved is successfully ");
                    message ="Chúc mừng bạn đã trở thành tài xế";
                    gcm_message.addData('is_approved',is_approved);
                    gcm_message.addData('message', message);
                    gcm_message.addData('title', "Sbike");
                // Add the registration tokens of the devices you want to send to
                var registrationTokens = [];
                registrationTokens.push(token_gcm);
                sender.sendNoRetry(gcm_message, { registrationTokens: registrationTokens }, function(err, response) {
                    if(err) console.error(err);
                    else console.log(response);
                });}
            })
        }else{
            message = 'Vui lòng kiểm tra lại thông tin của bạn. Chúng tôi nghĩ bạn đã nhập sai thông tin';
            gcm_message.addData('is_approved',is_approved);
            gcm_message.addData('message', message);
            gcm_message.addData('title', "Sbike");
            // Add the registration tokens of the devices you want to send to
            var registrationTokens = [];
            registrationTokens.push(token_gcm);
            sender.sendNoRetry(gcm_message, { registrationTokens: registrationTokens }, function(err, response) {
                if(err) console.error(err);
                else console.log(response);
            });
        }
         res.redirect("/become");
    });

}