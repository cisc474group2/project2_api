"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocModel = void 0;
var GeoLocModel = /** @class */ (function () {
    function GeoLocModel() {
        this.lng = 0.0;
        this.lat = 0.0;
    }
    GeoLocModel.fromObject = function (object) {
        var gl = new GeoLocModel();
        gl.lng = object.lng;
        gl.lat = object.lat;
        return gl;
    };
    GeoLocModel.prototype.toObject = function () {
        return { lng: this.lng, lat: this.lat };
    };
    return GeoLocModel;
}());
exports.GeoLocModel = GeoLocModel;
//# sourceMappingURL=geolocModel.js.map