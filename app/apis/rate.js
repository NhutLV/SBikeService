'use strick'

var Rate = require('../models/rate');

module.exports = function(app) {

    //  create rate
    app.post('/rate', function(req, res) {
        var id = req.body.id_history;
        var rating = req.body.rating;
        var comment = req.body.comment;
        
        console.log("Id"+id);
        console.log("rating"+rating);
        console.log("comment"+comment);        

        if (id === undefined || rating === undefined || comment === undefined) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            Rate.create({
                id_history: id,
                rating: rating,
                comment: comment
            }, function(err, data) {
                if (err) {
                    res.json({ error: true, data: null, message: 'Gửi rate thất bại' });
                } else {
                    res.json({ error: false, data: data, message: 'Gửi rate thành công' });
                }
            });
        }
    });
}