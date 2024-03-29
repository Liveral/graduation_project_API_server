"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogsModule = void 0;
var common_1 = require("@nestjs/common");
var date_logs_service_1 = require("./date.logs.service");
var date_logs_controller_1 = require("./date.logs.controller");
var mongoose_1 = require("@nestjs/mongoose");
var date_logs_schema_1 = require("./date.logs.schema");
var users_module_1 = require("../../../../../../../../src/users/users.module");
var date_logs_repository_1 = require("./date.logs.repository");
var LogsModule = /** @class */ (function () {
    function LogsModule() {
    }
    LogsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: date_logs_schema_1.Logs.name,
                        schema: date_logs_schema_1.LogsSchema
                    },
                ]),
            ],
            controllers: [date_logs_controller_1.LogsController],
            providers: [date_logs_service_1.LogsService, date_logs_repository_1.LogsRepository]
        })
    ], LogsModule);
    return LogsModule;
}());
exports.LogsModule = LogsModule;
