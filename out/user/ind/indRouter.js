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
exports.IndRouter = void 0;
var AppRouter_1 = require("../../common/AppRouter");
var indController_1 = require("./indController");
//This is just an example second router to show how additional routers can be added
var IndRouter = /** @class */ (function (_super) {
    __extends(IndRouter, _super);
    function IndRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    IndRouter.prototype.setupRoutes = function () {
        this.expressRouter.get('/', IndRouter.IndController.getAllIndividuals);
        this.expressRouter.get('/:id', IndRouter.IndController.getOneIndividual);
    };
    IndRouter.IndController = new indController_1.IndController();
    return IndRouter;
}(AppRouter_1.AppRouter));
exports.IndRouter = IndRouter;
//# sourceMappingURL=indRouter.js.map