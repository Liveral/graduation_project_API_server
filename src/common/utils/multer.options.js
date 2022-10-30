"use strict";
exports.__esModule = true;
exports.multerOptions = void 0;
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var createFolder = function (folder) {
    try {
        console.log('💾 Create a root uploads folder...');
        fs.mkdirSync(path.join(__dirname, '..', "uploads"));
    }
    catch (error) {
        console.log('The folder already exists...');
    }
    try {
        console.log("\uD83D\uDCBE Create a ".concat(folder, " uploads folder..."));
        fs.mkdirSync(path.join(__dirname, '..', "uploads/".concat(folder)));
    }
    catch (error) {
        console.log("The ".concat(folder, " folder already exists..."));
    }
};
var storage = function (folder) {
    createFolder(folder);
    return multer.diskStorage({
        destination: function (req, file, cb) {
            //* 어디에 저장할 지
            var folderName = path.join(__dirname, '..', "uploads/".concat(folder));
            cb(null, folderName);
        },
        filename: function (req, file, cb) {
            //* 어떤 이름으로 올릴 지
            var ext = path.extname(file.originalname);
            var fileName = "".concat(path.basename(file.originalname, ext)).concat(Date.now()).concat(ext);
            cb(null, fileName);
        }
    });
};
var multerOptions = function (folder) {
    var result = {
        storage: storage(folder)
    };
    return result;
};
exports.multerOptions = multerOptions;
