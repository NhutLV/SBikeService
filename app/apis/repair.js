'user strict'

var Repair = require('../models/repair');

module.exports = function(app) {

    //  add history
    app.post('/repair/create', function(req, res) {
        var id_user = req.body.id_user_created;
        var name = req.body.name;
        var number_phone = req.body.number_phone;
        var address = req.body.address;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var type_repair = req.body.type_repair;
        var time_open = req.body.time_open;
        var time_close = req.body.time_close;
        var timestamp_created = new Date();

        if (id_user === undefined || name === undefined || number_phone === undefined ||
            address === undefined || type_repair === undefined || time_open == undefined ||
            time_close === undefined) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            Repair.create({
                    id_user_created: id_user,
                    name: name,
                    number_phone: number_phone,
                    address: address,
                    latitude: latitude,
                    longitude: longitude,
                    type_repair: type_repair,
                    time_open: time_open,
                    time_close: time_close,
                    timestamp_created : timestamp_created
                },
                function(err, data) {
                    if (err) {
                        res.json({ error: true, data: null, message: 'Tạo repair thất bại' });
                    } else {
                        res.json({ error: false, data: data, message: 'Tạo repair thành công' });
                    }
                });
        }
    });

    //  get Repair by id
    app.get('/repair/:type_repair', function(req, res) {
        var type_repair = req.params.type_repair;

        Repair.find({ type_repair: parseInt(type_repair) })
        .populate('id_user_created')
        .sort({timestamp_created: -1})
        .exec(function(err, data) {
            if (err) {
                res.json({ error: true, data: null, message: 'Lấy repair thất bại' });
            } else {
                res.json({ error: false, data: data, message: 'Lấy repair tin thành công' });
            }
        });
    });
}