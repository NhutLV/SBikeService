'user strict'

var History = require('../models/history');
var dateFormat = require('dateformat');
var FCM = require('fcm-node');
var gcm = require('node-gcm');
var gcm_message = new gcm.Message();

module.exports = function(app) {

    //  add history
    app.post('/journey/create', function(req, res) {
        var id_user = req.body.id_user;
        var id_biker = req.body.id_biker;
        var time_call = req.body.time_call;
        var place_from = req.body.place_from;
        var latitude_from = req.body.latitude_from;
        var longitude_from = req.body.longitude_from;
        var place_to = req.body.place_to;
        var latitude_to = req.body.latitude_to;
        var longitude_to = req.body.longitude_to;
        var distance = req.body.distance;
        var price = req.body.price;
        var time_spend = req.body.time_spend;
        var token_fcm = req.body.token_gcm;

        console.log("id_user "+id_user);
        console.log("id_biker "+id_biker);
        console.log("time call " +time_call);
        console.log("place_from "+place_from);
        console.log("place_to "+place_to);
        console.log("latitude_from "+latitude_from);
        console.log("longitude_from " +longitude_from);
        console.log("latitude_to "+latitude_to);
        console.log("longitude_to " +longitude_to);
        console.log("distance "+distance);
        console.log("price "+price);
        console.log("time_spend "+time_spend);
        console.log("gcm "+token_fcm);
    
        var message ='Vui lòng gởi lại phản hồi về chuyến đi của bạn vào lúc '+time_call;

        if (id_user === undefined || id_biker === undefined || time_call === undefined ||
            place_from === undefined || latitude_from === undefined || longitude_from == undefined ||
            place_to === undefined || latitude_to === undefined || longitude_to === undefined ||
            distance === undefined || price === undefined || time_spend === undefined) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            History.create({
                    id_user: id_user,
                    id_biker: id_biker,
                    time_call: time_call,
                    place_from: place_from,
                    latitude_from: latitude_from,
                    longitude_from: longitude_from,
                    place_to: place_to,
                    latitude_to: latitude_to,
                    longitude_to: longitude_to,
                    distance: distance,
                    price: price,
                    time_spend: time_spend,
                    token_fcm: token_fcm
                },
                function(err, data) {
                    if (err) {
                        res.json({ error: true, data: null, message: 'Tạo lịch sử thất bại' });
                    } else {
                        var sender = new gcm.Sender('AIzaSyBGmoce6oxJO0wPsIhSeNpBJnWr_tcsVp0');
                        gcm_message.addData('place_to',place_to);
                        gcm_message.addData('message', message);
                        gcm_message.addData('title', "Sbike");
                        gcm_message.addData('place_from', place_from);
                        gcm_message.addData('id_history', data._id);
                        
                        // Add the registration tokens of the devices you want to send to
                        var registrationTokens = [];
                        registrationTokens.push(token_fcm);
                        setTimeout(function check(){
                            sender.sendNoRetry(gcm_message, { registrationTokens: registrationTokens }, function(err, response) {
                            if(err) console.error(err);
                            else console.log(response);
                        });
                        }, 1000);
                        res.json({ error: false, data: data, message: 'Tạo lịch sử thành công' });
                    }
                });
        }
    });

    //  get history by id
    app.get('/journey/:id_user', function(req, res) {
        var id = req.params.id_user;

        History.find({ id_user: id })
        .populate('id_biker')
        .sort({time_call: -1})
        .exec(function(err, data) {
            if (err) {
                res.json({ error: true, data: null, message: 'Lấy lịch sử thất bại' });
            } else {
                res.json({ error: false, data: data, message: 'Lấy thông tin thành công' });
            }
        });
    });
}