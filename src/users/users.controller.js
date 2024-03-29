"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var user_interceptor_1 = require("../../../../../../../../src/common/interceptors/user.interceptor");
var jwt_guard_1 = require("../../../../../../../../src/auth/jwt/jwt.guard");
var CurrentUser_decorator_1 = require("../../../../../../../../src/decorator/CurrentUser.decorator");
var UsersController = /** @class */ (function () {
    function UsersController(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    UsersController.prototype.getCurrentCat = function (user) {
        return user.readOnlyData;
    };
    UsersController.prototype.signUp = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.signUp(body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.logIn = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.jwtLogIn(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.kakaoCallback = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = request.query.code;
                        console.log('kakao redirect query code = ' + code);
                        return [4 /*yield*/, this.userService.kakaoLogIn(code)];
                    case 1: 
                    //return 'ok';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.setAllergyAdditive = function (user, 
    //@Body() data: AdditiveModifyDto,
    data) {
        return __awaiter(this, void 0, void 0, function () {
            var newData;
            return __generator(this, function (_a) {
                console.log(data);
                newData = {
                    email: user.email,
                    allergyAdditive: data.allergyAdditive
                };
                console.log(newData);
                return [2 /*return*/, this.userService.setAllergy(newData)];
            });
        });
    };
    UsersController.prototype.setPreferAdditive = function (user, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(data);
                return [2 /*return*/, this.userService.setPrefer(data)];
            });
        });
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: '현재 로그인한 유저 정보 가져오기' }),
        (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
        (0, common_2.Get)(),
        __param(0, (0, CurrentUser_decorator_1.CurrentUser)())
    ], UsersController.prototype, "getCurrentCat");
    __decorate([
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Server Error...'
        }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: '성공!'
        }),
        (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "signUp");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: '로그인' }),
        (0, common_1.Post)('login'),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "logIn");
    __decorate([
        (0, common_2.Get)('kakao/callback'),
        __param(0, (0, common_1.Req)())
    ], UsersController.prototype, "kakaoCallback");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: '알러기 성분 설정' }),
        (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
        (0, common_1.Post)('allergy'),
        __param(0, (0, CurrentUser_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "setAllergyAdditive");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: '선호 성분 설정' }),
        (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
        (0, common_1.Post)('prefer'),
        __param(0, (0, CurrentUser_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "setPreferAdditive");
    UsersController = __decorate([
        (0, common_1.Controller)('user'),
        (0, common_1.UseInterceptors)(user_interceptor_1.UserIntercepter)
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
