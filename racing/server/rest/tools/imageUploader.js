const fs = require("fs");
const uuid = require('node-uuid');
const mkdirp = require("mkdirp");

const dir = 'public/upload/photo/'

mkdirp(dir, function (err) {
    if (err) console.error(err)
})

function upload(data) {
    var imageBin = data.replace(/^data:image\/\w+;base64,/, '');
    const fileName = `public/upload/photo/${Date.now()}${uuid.v4()}.png`

    fs.writeFile(fileName, imageBin, {encoding: 'base64'}, function (err) {
        console.log("上传文件：", err)
    });
    return fileName;
}

exports.upload = upload;