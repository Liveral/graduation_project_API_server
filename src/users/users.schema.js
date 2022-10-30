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
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var class_validator_1 = require("class-validator");
var mongoose_2 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var options = {
    timestamps: true
};
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'hongyoubin@naver.com',
            description: 'email',
            required: true
        }),
        (0, mongoose_1.Prop)({
            required: true,
            unique: true
        }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsNotEmpty)()
    ], User.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '홍유빈',
            description: 'name',
            required: true
        }),
        (0, mongoose_1.Prop)({
            required: true
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], User.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '12453',
            description: 'password',
            required: true
        }),
        (0, mongoose_1.Prop)({
            required: true
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], User.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '[호두, 땅콩, 구연산]',
            description: 'prefer Food Additive'
        }),
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsArray)()
    ], User.prototype, "preferAdditive");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: '[호두, 땅콩, 구연산]',
            description: 'allgergy Food Additive'
        }),
        (0, mongoose_1.Prop)(),
        (0, class_validator_1.IsArray)()
    ], User.prototype, "allergyAdditive");
    User = __decorate([
        (0, mongoose_1.Schema)(options)
    ], User);
    return User;
}(mongoose_2.Document));
exports.User = User;
var _UserSchema = mongoose_1.SchemaFactory.createForClass(User);
_UserSchema.virtual('readOnlyData').get(function () {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        preferAdditive: this.preferAdditive,
        allergyAdditive: this.allergyAdditive
    };
});
exports.UserSchema = _UserSchema;
