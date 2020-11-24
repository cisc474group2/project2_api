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
exports.BusRouter = void 0;
var AppRouter_1 = require("../../common/AppRouter");
var securityMiddleware_1 = require("../../security/securityMiddleware");
var busController_1 = require("./busController");
//Router for business portion of the API
var BusRouter = /** @class */ (function (_super) {
    __extends(BusRouter, _super);
    function BusRouter() {
        return _super.call(this) || this;
    }
    //called by the framework to add the routes for the business portion of the API
    BusRouter.prototype.setupRoutes = function () {
        this.expressRouter.get('/', BusRouter.BusController.getAllBusinesses);
        this.expressRouter.get('/:id', BusRouter.BusController.getBusiness);
        this.expressRouter.delete('/:id/hosted_events', [securityMiddleware_1.SecurityMiddleware.RequireAuth], BusRouter.BusController.getHostedEvents);
    };
    BusRouter.BusController = new busController_1.BusController();
    return BusRouter;
}(AppRouter_1.AppRouter));
exports.BusRouter = BusRouter;
//# sourceMappingURL=busRouter.js.map