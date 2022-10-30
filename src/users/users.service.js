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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var axios_1 = require("axios");
var UsersService = /** @class */ (function () {
    function UsersService(userRepository, httpService) {
        this.userRepository = userRepository;
        this.httpService = httpService;
    }
    UsersService.prototype.getAllUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUser, readOnlyUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findAll()];
                    case 1:
                        allUser = _a.sent();
                        readOnlyUsers = allUser.map(function (user) { return user.readOnlyData; });
                        return [2 /*return*/, readOnlyUsers];
                }
            });
        });
    };
    UsersService.prototype.signUp = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, name, password, isUserExist, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email, name = body.name, password = body.password;
                        return [4 /*yield*/, this.userRepository.existEmail(email)];
                    case 1:
                        isUserExist = _a.sent();
                        if (isUserExist) {
                            throw new common_1.HttpException('해당하는 유저는 이미 존재합니다.', 403);
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userRepository.create({
                                email: email,
                                name: name,
                                password: hashedPassword
                            })];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user.readOnlyData];
                }
            });
        });
    };
    // repository와 연결
    UsersService.prototype.setAllergy = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, AdditiveArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email;
                        AdditiveArr = body.allergyAdditive;
                        console.log(AdditiveArr);
                        return [4 /*yield*/, this.userRepository.updateAllergyAdditive(email, AdditiveArr)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.setPrefer = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, AdditiveArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email;
                        AdditiveArr = body.preferAdditive;
                        return [4 /*yield*/, this.userRepository.updatePreferAdditive(email, AdditiveArr)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.kakaoLogIn = function (authCode) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, grant_type, client_id, redirect_uri, code, _url, _header, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        grant_type = 'authorization_code';
                        client_id = '7862e93fa3e686b15d51fc2c69e120aa';
                        redirect_uri = 'http://43.201.142.236:8000/user/kakao/callback';
                        code = authCode;
                        _url = "https://kauth.kakao.com/oauth/token?grant_type=".concat(grant_type, "&client_id=").concat(client_id, "&redirect_uri=").concat(redirect_uri, "&code=").concat(code);
                        _header = {
                            headers: {
                                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                            }
                        };
                        console.log('before axios');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: 'GET',
                                url: 'https://www.google.com',
                                headers: {
                                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                                }
                            })];
                    case 2:
                        res = _a.sent();
                        console.log(JSON.stringify(res.data));
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        console.log('after axios');
                        return [2 /*return*/, 'ok'];
                }
            });
        });
    };
    UsersService = __decorate([
        (0, common_1.Injectable)()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
