"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserModel = /** @class */ (function () {
    //encrypts password
    function UserModel(email, password) {
        this._id = '';
        this.email = '';
        this._password = '';
        this._password_reset = '';
        this.type = '';
        this.type_obj = Object;
        this.last_login = Object;
        this.create_date = Object;
        this.reg_events = [];
        this.email = email;
        this.password = password;
    }
    Object.defineProperty(UserModel.prototype, "password", {
        //returns encrypted password
        get: function () { return this._password; },
        //when user password is set through here, it is stored encrypted
        set: function (val) {
            this._password = UserModel.encryptString(val);
        },
        enumerable: false,
        configurable: true
    });
    UserModel.fromObject = function (object) {
        var u = new UserModel(object.email, '');
        u._id = object.user_id;
        u.email = object.email;
        u._password = object.password;
        u._password_reset = object.password_reset;
        u.type = object.type;
        u.type_obj = object.type_object;
        u.last_login = object.last_login;
        u.reg_events = object.reg_events;
        return u;
    };
    UserModel.prototype.toObject = function () {
        return { email: this.email,
            password: this._password,
            password_reset: this._password_reset,
            type: this.type,
            type_obj: this.type_obj,
            last_login: this.last_login,
            reg_events: this.reg_events };
    };
    //compares unencrypted password to encrypted password
    UserModel.prototype.validatePassword = function (password) {
        if (this.password === '*') {
            return false;
        }
        return bcrypt_1.default.compareSync(password, this.password);
    };
    //encrypt a string using the bcrypt library
    UserModel.encryptString = function (inval) {
        try {
            var salt = bcrypt_1.default.genSaltSync(10);
            return bcrypt_1.default.hashSync(inval, salt);
        }
        catch (err) {
            return '*';
        }
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map