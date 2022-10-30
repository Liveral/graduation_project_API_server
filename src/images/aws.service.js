"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AwsService = void 0;
var path = require("path");
var AWS = require("aws-sdk");
var common_1 = require("@nestjs/common");
// sharp
var AwsService = /** @class */ (function () {
    function AwsService(configService) {
        this.configService = configService;
        //AWS S3 instance 생성
        this.awsS3 = new AWS.S3({
            accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
            region: this.configService.get('AWS_S3_REGION')
        });
        this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME'); // nest-s3
    }
    AwsService.prototype.uploadFileToS3 = function (folder, file) {
        return __awaiter(this, void 0, void 0, function () {
            var key, s3Object, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        key = "".concat(folder, "/").concat(Date.now(), "_").concat(path.basename(file.originalname)).replace(/ /g, '');
                        return [4 /*yield*/, this.awsS3
                                .putObject({
                                Bucket: this.S3_BUCKET_NAME,
                                Key: key,
                                Body: file.buffer,
                                ACL: 'public-read',
                                ContentType: file.mimetype
                            })
                                .promise()];
                    case 1:
                        s3Object = _a.sent();
                        return [2 /*return*/, { key: key, s3Object: s3Object, contentType: file.mimetype }];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new common_1.BadRequestException("File upload failed : ".concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AwsService.prototype.deleteS3Object = function (key, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.awsS3
                                .deleteObject({
                                Bucket: this.S3_BUCKET_NAME,
                                Key: key
                            }, callback)
                                .promise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 2:
                        error_2 = _a.sent();
                        throw new common_1.BadRequestException("Failed to delete file : ".concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AwsService.prototype.getAwsS3FileUrl = function (objectKey) {
        return "https://".concat(this.S3_BUCKET_NAME, ".s3.amazonaws.com/").concat(objectKey);
    };
    AwsService = __decorate([
        (0, common_1.Injectable)()
    ], AwsService);
    return AwsService;
}());
exports.AwsService = AwsService;
