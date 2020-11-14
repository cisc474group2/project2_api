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
exports.GeoLocRouter = void 0;
var AppRouter_1 = require("../../common/AppRouter");
var geolocController_1 = require("./geolocController");
//Router for events portion of the api
var GeoLocRouter = /** @class */ (function (_super) {
    __extends(GeoLocRouter, _super);
    function GeoLocRouter() {
        return _super.call(this) || this;
    }
    //called by the framework to add the routes for the security portion of the API
    GeoLocRouter.prototype.setupRoutes = function () {
        this.expressRouter.get('/:lng_lat', GeoLocRouter.geolocController.getEventsCenteredOnLngLat);
        this.expressRouter.get('/:lng_lat/:rad', GeoLocRouter.geolocController.getEventsCenteredOnLngLatCustomRadius);
    };
    GeoLocRouter.geolocController = new geolocController_1.GeoLocController();
    return GeoLocRouter;
}(AppRouter_1.AppRouter));
exports.GeoLocRouter = GeoLocRouter;
//# sourceMappingURL=geolocRouter.js.map