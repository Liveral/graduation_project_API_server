"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./users.service");
var mongoose_1 = require("@nestjs/mongoose");
var users_schema_1 = require("./users.schema");
var users_repository_1 = require("./users.repository");
var auth_module_1 = require("../../../../../../../../src/auth/auth.module");
var date_logs_module_1 = require("../../../../../../../../src/Datelogs/date.logs.module");
var axios_1 = require("@nestjs/axios");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }),
                (0, common_1.forwardRef)(function () { return date_logs_module_1.LogsModule; }),
                axios_1.HttpModule,
            ],
            controllers: [users_controller_1.UsersController],
            providers: [users_service_1.UsersService, users_repository_1.UserRepository],
            exports: [users_service_1.UsersService, users_repository_1.UserRepository]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
