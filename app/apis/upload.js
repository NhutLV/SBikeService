
'user strict'
var fs = require('fs');
var express = require('express');
var multer  = require('multer');

module.exports = function(app) {

var upload = multer(
    { 
        limits: {
            fieldNameSize: 999999999,
            fieldSize: 999999999
        },
        dest: 'uploads/' }
    );

app.post('/upload/:id', upload.single('file'), function(req, res){
  
    console.log(req.file);
    console.log("upload");

    console.log(req.params.id);

    var tmp_path = req.file.path

    var target_path = 'uploads/' + req.file.filename;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() {

            console.log("OK");
            res.json({error: false,data: null, message :"Upload thành công"});
        });
    src.on('error', function(err) {
            console.log("ERROR"+err);
             res.send({error: true,data: null, message :"Đã xảy ra lỗi trong quá trình upload"}); 
        });
});

app.get('/uploads/:file', function (req, res){
        file = req.params.file;
        var dirname = "/tailieu/DATN/SBikeService";
        var img = fs.readFileSync(dirname + "/uploads/" + file);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
});
};