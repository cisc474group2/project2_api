"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.user_id = '';
        this.email = '';
        this.password = '';
        this.password_reset = '';
        this.type = '';
        this.type_obj = '';
        this.last_login = '';
        this.reg_events = [];
    }
    UserModel.fromObject = function (object) {
        var u = new UserModel();
        u.user_id = object.user_id;
        u.email = object.email;
        u.password = object.password;
        u.password_reset = object.password_reset;
        u.type = object.type;
        u.type_obj = object.type_object;
        u.last_login = object.last_login;
        u.reg_events = object.reg_events;
        return u;
    };
    UserModel.prototype.toObject = function () {
        return { user_id: this.user_id, email: this.email, password: this.password, password_reset: this.password_reset, type: this.type, type_obj: this.type_obj, last_login: this.last_login, reg_events: this.reg_events };
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map