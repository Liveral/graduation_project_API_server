"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogsSchema = exports.Logs = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var class_validator_1 = require("class-validator");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var options = {
    timestamps: true
};
var Logs = /** @class */ (function (_super) {
    __extends(Logs, _super);
    function Logs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '유저 id',
            required: true
        }),
        (0, mongoose_1.Prop)({
            type: mongoose_2.Types.ObjectId,
            required: true,
            ref: 'cats'
        }),
        (0, class_validator_1.IsNotEmpty)()
    ], Logs.prototype, "User_id");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '[호두, 땅콩, 구연산]',
            description: 'Food Additive Log'
        }),
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsArray)()
    ], Logs.prototype, "AdditiveLogs");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '[comments]',
            description: 'Food Additive comment'
        }),
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsString)()
    ], Logs.prototype, "Comment");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'rating',
            description: 'Food Additive rating'
        }),
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsNumber)()
    ], Logs.prototype, "Rating");
    Logs = __decorate([
        (0, mongoose_1.Schema)(options)
    ], Logs);
    return Logs;
}(mongoose_2.Document));
exports.Logs = Logs;
exports.LogsSchema = mongoose_1.SchemaFactory.createForClass(Logs);
