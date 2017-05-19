var express	=	require("express");
var multer	=	require('multer');
var User = require('../models/user');
var filename ="";
var id ="";
module.exports = function(app) {
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) { 
      filename = file.fieldname + '-' + Date.now()+".jpg";
    callback(null, filename);
  }
});
var upload = multer({ storage : storage}).single("file");

app.get('/',function(req,res){
      res.render("index1");
});

app.post('/api/upload',function(req,res){
	upload(req,res,function(err) {
        id = req.body.id_user;
        console.log("id "+id);
        if(err) {
			return res.end("Error uploading file.");
		}
        if(id === undefined){
            console.log("ccccc");
        }else{
             console.log("id "+id);
             User.findByIdAndUpdate({_id:id},  {
                image_avatar_path : filename
            },{new : true}).exec(function(err, data) {
                    if (err) {
                        console.log("Update is successfully");
                        console.log("data "+data );
                        res.json({ error: true, data:null, message: 'Cập nhật thông tin bị lỗi' });
                    } else {
                        console.log("Update is failed"+err);
                        console.log("data "+data );
                        res.json({ error: false, data: data, message: 'Cập nhật thông tin thành công' });
                    }
                });
        }
	});
});
}
