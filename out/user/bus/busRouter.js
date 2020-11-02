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
exports.BusRouter = void 0;
var AppRouter_1 = require("../../common/AppRouter");
var securityMiddleware_1 = require("../../security/securityMiddleware");
var busController_1 = require("./busController");
//This is just an example second router to show how additional routers can be added
var BusRouter = /** @class */ (function (_super) {
    __extends(BusRouter, _super);
    function BusRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    BusRouter.prototype.setupRoutes = function () {
        this.expressRouter.post('/', [securityMiddleware_1.SecurityMiddleware.RequireAuth], BusRouter.BusController.getAllBusinesses);
        this.expressRouter.put('/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], BusRouter.BusController.getBusiness);
        this.expressRouter.delete('/:id/hosted_events', [securityMiddleware_1.SecurityMiddleware.RequireAuth], BusRouter.BusController.getHostedEvents);
    };
    BusRouter.BusController = new busController_1.BusController();
    return BusRouter;
}(AppRouter_1.AppRouter));
exports.BusRouter = BusRouter;
//# sourceMappingURL=busRouter.js.map