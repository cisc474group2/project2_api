"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var AppRouter_1 = require("../common/AppRouter");
var securityMiddleware_1 = require("../security/securityMiddleware");
var userController_1 = require("./userController");
var busRouter_1 = require("./bus/busRouter");
var indRouter_1 = require("./ind/indRouter");
//Router for user portion of the API
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        return _super.call(this) || this;
    }
    //called by the framework to add the routes for the user portion of the API
    UserRouter.prototype.setupRoutes = function () {
        this.addRouter('/bus', new busRouter_1.BusRouter());
        this.addRouter('/ind', new indRouter_1.IndRouter());
        this.expressRouter.post('/', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UserRouter.userController.createUser);
        this.expressRouter.put('/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UserRouter.userController.updateUser);
        this.expressRouter.delete('/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UserRouter.userController.deleteUser);
        this.expressRouter.get('/:id/type', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UserRouter.userController.getType);
    };
    UserRouter.userController = new userController_1.UserController();
    return UserRouter;
}(AppRouter_1.AppRouter));
exports.UserRouter = UserRouter;
//# sourceMappingURL=userRouter.js.map