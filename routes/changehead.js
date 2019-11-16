const fs = require('fs');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
let uploads = multer({ dest: 'uploads/'})
const FILE_PATH = "public/images/"
let user = mongoose.model('user')
let moment = require('moment')

//router.use(express.static('public'))
router.post('/', uploads.single('files'), function (req, res, next) {
    let date = moment(new Date()).format('YYYYMMDDHHmmssSS');
    let filename = req.body.username + date.toString() + ".jpg";
    let filepath = FILE_PATH + filename;
    let username = req.body.username;
    let output = fs.createWriteStream(filepath)
    let input = fs.createReadStream(req.file.path)
    input.pipe(output)

    user.updateOne({username:username},{img:filename},function (err,user) {
        res.json("success")
    })
})

module.exports = router;
