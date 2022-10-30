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
exports.LogsRepository = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var date_logs_schema_1 = require("./date.logs.schema");
var LogsRepository = /** @class */ (function () {
    function LogsRepository(LogsModel) {
        this.LogsModel = LogsModel;
    }
    LogsRepository.prototype.create = function (createLogDto, id) {
        return __awaiter(this, void 0, void 0, function () {
            var AdditiveLogs, Comment_1, Rating, newLogs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        AdditiveLogs = createLogDto.AdditiveLogs, Comment_1 = createLogDto.Comment, Rating = createLogDto.Rating;
                        newLogs = new this.LogsModel({
                            User_id: id,
                            AdditiveLogs: AdditiveLogs,
                            Comment: Comment_1,
                            Rating: Rating
                        });
                        return [4 /*yield*/, newLogs.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw new common_1.BadRequestException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*
    
    async findUserById(userId: string | Types.ObjectId): Promise<User | null> {
      const user = await this.userModel.findById(userId).select('-password');
      return user;
    }
    
    */
    //npm run start:dev
    //npm run build
    LogsRepository.prototype.getLogs = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var LogsData, LogArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.LogsModel.find({ User_id: id })];
                    case 1:
                        LogsData = _a.sent();
                        /*
                          .select('-User_id')0
                          .select('-_id')
                          .select('-updatedAt');
                        */
                        console.log(date_logs_schema_1.Logs);
                        LogArr = [];
                        LogsData.forEach(function (data) {
                            var Log = {};
                            Log['AdditiveLogs'] = data['AdditiveLogs'];
                            Log['Comment'] = data['Comment'];
                            Log['Rating'] = data['Rating'];
                            var date = String(data['createdAt']);
                            //console.log(typeof date);
                            //console.log(String(date));
                            var month = date.slice(4, 7);
                            var day = date.slice(8, 10);
                            if (month == 'Jan') {
                                month = '01';
                            }
                            else if (month == 'Feb') {
                                month = '02';
                            }
                            else if (month == 'Mar') {
                                month = '03';
                            }
                            else if (month == 'Apr') {
                                month = '04';
                            }
                            else if (month == 'May') {
                                month = '05';
                            }
                            else if (month == 'Jun') {
                                month = '06';
                            }
                            else if (month == 'Jul') {
                                month = '07';
                            }
                            else if (month == 'Aug') {
                                day = '08';
                            }
                            else if (month == 'Sep') {
                                month = '09';
                            }
                            else if (month == 'Oct') {
                                month = '10';
                            }
                            else if (month == 'Nov') {
                                month = '11';
                            }
                            else if (month == 'Dec') {
                                month = '12';
                            }
                            var year = date.slice(11, 15);
                            date = year + '-' + month + '-' + day;
                            //console.log(date);
                            Log['date'] = date;
                            LogArr.push(Log);
                        });
                        //console.log(LogArr);
                        return [2 /*return*/, LogArr];
                }
            });
        });
    };
    LogsRepository = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(date_logs_schema_1.Logs.name))
    ], LogsRepository);
    return LogsRepository;
}());
exports.LogsRepository = LogsRepository;
