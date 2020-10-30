"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
//import { IndRouter } from './bus/indRouter';
//This is just an example second router to show how additional routers can be added
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    UserRouter.prototype.setupRoutes = function () {
        this.addRouter('/bus', new busRouter_1.BusRouter());
        //this.addRouter('/ind', new IndRouter());
        this.expressRouter.post('/', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UserRouter.userController.createUser);
        this.expressRouter.put('/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UserRouter.userController.updateUser);
        this.expressRouter.delete('/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UserRouter.userController.deleteUser);
    };
    UserRouter.userController = new userController_1.UserController();
    return UserRouter;
}(AppRouter_1.AppRouter));
exports.UserRouter = UserRouter;
//# sourceMappingURL=userRouter.js.map