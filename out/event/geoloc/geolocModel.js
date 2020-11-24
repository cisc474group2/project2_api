"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocModel = void 0;
var config_1 = require("../../config");
var GeoLocModel = /** @class */ (function () {
    function GeoLocModel(lng, lat) {
        if (lng === void 0) { lng = 0.0; }
        if (lat === void 0) { lat = 0.0; }
        this.lng = lng;
        this.lat = lat;
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
    GeoLocModel.googleGeoCoding = function (combinedAddress) {
        return new Promise(function (resolve, reject) {
            var addressComponents = combinedAddress.split('+');
            var dynURL = config_1.Config.GOOGLE_GEOCODING
                .replace('<<OUT>>', 'json')
                .replace('<<ADDR>', encodeURIComponent(addressComponents[0]) +
                '+' + encodeURIComponent(addressComponents[2]) +
                '+' + encodeURIComponent(addressComponents[3]) +
                '+' + encodeURIComponent(addressComponents[4]))
                .replace('<<KEY>>', config_1.Config.GOOGLE_API);
            var axios = require('axios').default;
            var lng = 0.0;
            var lat = 0.0;
            axios.get(dynURL).then(function (responce) {
                console.log(responce);
                lng = responce.data.results[0].geometry.location.lng;
                lat = responce.data.results[0].geometry.location.lat;
                return resolve(new GeoLocModel(lng, lat));
            }).catch(function (error) {
                console.log(error);
                return reject(error);
            });
        });
    };
    return GeoLocModel;
}());
exports.GeoLocModel = GeoLocModel;
//# sourceMappingURL=geolocModel.js.map