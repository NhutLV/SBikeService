'use strick'

var FeedBack = require('../models/feedback');

module.exports = function(app) {

    //  send feedback
    app.post('/feedback', function(req, res) {
        var id = req.body.id_user;
        var title = req.body.title;
        var content = req.body.content;

        if (id === undefined || title === undefined || content === undefined) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            FeedBack.create({
                id_user: id,
                title: title,
                content: content
            }, function(err, data) {
                if (err) {
                    res.json({ error: true, data: null, message: 'Gửi feedback thất bại' });
                } else {
                    res.json({ error: false, data: data, message: 'Gửi feedback thành công' });
                }
            });
        }
    });
}