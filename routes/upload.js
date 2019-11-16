const fs = require('fs');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
let uploads = multer({ dest: 'uploads/'})
const FILE_PATH = "public/images/"
let userfile = mongoose.model('userfile')
let moment = require('moment')

router.post('/', uploads.single('files'), function (req, res, next) {
    let date = moment(new Date()).format('YYYYMMDDHHmmssSS');
    let uploadtime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    let filename = req.body.username + date.toString() + ".jpg";
    let filepath = FILE_PATH + filename;
    let username = req.body.username;
    let output = fs.createWriteStream(filepath)
    let input = fs.createReadStream(req.file.path)
    input.pipe(output)
    let addfile = {username:username,filename:filename,filepath:filepath,uploadtime:uploadtime,age:req.body.age,score: req.body.score}
    userfile.create(addfile, function (err, newfile) {
        res.json("success")
    })
})

module.exports = router;
