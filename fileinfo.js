var express = require('express');
var multer = require('multer');
var app = express();
var server = require('http').createServer(app);
var upload = multer({ dest: 'uploads/' }).single("image");
module.exports.getfileinfo=function(req,res){
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log("error");

        } else {
            console.log(req.file);
            profilePicUrl = req.file.filename;
        }
})
}