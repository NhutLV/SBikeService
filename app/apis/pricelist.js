'use strick'

var PriceList = require('../models/pricelist');

module.exports = function(app) {

    //  send feedback
    app.post('/pricelist', function(req, res) {
        var first_price = req.body.first_price;
        var second_price = req.body.second_price;
        var fee = req.body.fee;

        console.log(first_price);
        console.log(second_price);
        console.log(fee);

        if (first_price === undefined || second_price === undefined || fee === undefined) {
            res.json({ error: true, data: null, message: 'Thiếu tham số' });
        } else {
            PriceList.create({
                first_price: first_price,
                second_price: second_price,
                fee: fee,
                date_created : new Date()
            }, function(err, data) {    
                if (err) {
                    res.json({ error: true, data: null, message: 'Tạo bảng giá thất bại' });
                } else {
                    res.json({ error: false, data: data, message: 'Tạo bảng giá thành công' });
                }
            });
        }
    });


    app.get("/pricelist", function(req,res){

        PriceList.find(function(err,data){
            if(err){
                res.json({error: true, message: 'Lấy bảng giá bị lỗi'});
            }else if(data.length === 0){
                res.json({error: true, data : null, message:'Không tồn tại record trong bảng giá'});
            }else{
                res.json({error: false, data : data[0], message:'Lấy thông tin bảng giá thành công'});
            }
        })
    });
}