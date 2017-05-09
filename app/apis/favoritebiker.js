'user strict'

var Favorite = require('../models/favoritebiker');
var User = require('../models/user');

module.exports = function(app) {

    //  get count not favorite
    app.get('/users/count-not-favorite/:id_user', function(req, res) {
        var id = req.params.id_user;

        Favorite.count({
            is_favorite: -1,
            id_biker: id
        }, function(err, data) {
            if (err) {
                res.json({ error: true, data: -1, message: 'Lấy thông tin bị lỗi' });
            } else {
                res.json({ error: false, data: data, message: 'Lấy thông tin thành công' });
            }
        });

    });

    //  get count favorite
    app.get('/users/count-favorite/:id_user', function(req, res) {
        var id = req.params.id_user;

        Favorite.count({
            is_favorite: 1,
            id_biker: id
        }, function(err, data) {
            if (err) {
                res.json({ error: true, data: -1, message: 'Lấy thông tin bị lỗi' });
            } else {
                res.json({ error: false, data: data, message: 'Lấy thông tin thành công' });
            }
        });
    });

    //  get list favorite
    app.get('/users/favorite/:id_user', function(req, res) {

        Favorite.find({
            id_user: req.params.id_user
        })
        .populate('id_biker')
        .exec(function(err, data) {
            if (err) {
                res.json({ error: true, data: null, message: 'Lấy thông tin thất bại' });
            } else {
                res.json({ error: false, data: data, message: 'Lấy thông tin thành công' });
            }
        });
    });

    //  check favorite
    app.post('/users/check-favorite', function(req, res) {
        var id_user = req.body.id_user;
        var id_biker = req.body.id_biker;
       if (id_user === undefined || id_biker === undefined ) {
            res.json({ error: true, message: 'Thiếu tham số' });
        } else {
            Favorite.findOne({
                id_user: id_user,
                id_biker: id_biker,
        }, function(err, data) {
                if (err) {
                    res.json({ error: true, message: 'Thêm thông tin bị lỗi' });
                } else {
                    if(data === null){
                        res.json({ error: false, data : 0, message: 'Thêm thông tin thành công' });
                    }else{
                        res.json({ error: false, data : data.is_favorite, message: 'Thêm thông tin thành công' });
                    }
                }
            });
        }
    });

    //  add favorite
    app.post('/users/favorite', function(req, res) {
        var id_user = req.body.id_user;
        var id_biker = req.body.id_biker;
        var is_favorite = req.body.is_favorite;

        if (id_user === undefined || id_biker === undefined || is_favorite === undefined) {
            res.json({ error: true, message: 'Thiếu tham số' });
        } else {
            Favorite.findOneAndUpdate({
                id_user: id_user,
                id_biker: id_biker,
        },{  is_favorite: parseInt(is_favorite) }, {upsert:true}, function(err, data) {
                if (err) {
                    res.json({ error: true, message: 'Thêm thông tin bị lỗi' });
                } else {
                    res.json({ error: false, message: 'Thêm thông tin thành công' });
                }
            });
        }
    });
}