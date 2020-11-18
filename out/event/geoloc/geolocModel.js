"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocModel = void 0;
var config_1 = require("../../config");
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
    GeoLocModel.googleGeoCoding = function (combinedAddress) {
        var gl = new GeoLocModel();
        var addressComponents = combinedAddress.split('+');
        var dynURL = config_1.Config.GOOGLE_GEOCODING
            .replace('<<OUT>>', 'json')
            .replace('<<ADDR>>', encodeURIComponent(addressComponents[0]) +
            '+' + encodeURIComponent(addressComponents[2]) +
            '+' + encodeURIComponent(addressComponents[3]) +
            '+' + encodeURIComponent(addressComponents[4]))
            .replace('<<KEY>>', config_1.Config.GOOGLE_API);
        var request = require('request');
        request(dynURL, { json: true }, function (err, res, body) {
            if (err) {
                return console.log(err);
            }
            console.log(body.url);
            console.log(body.explanation);
        });
        // (async () => {
        //     try {
        //         const response = await fetch(dynURL);
        //         const json = await response.json();
        //         gl.lng = json.results[0].geometry.location.lng;
        //         gl.lat = json.results[0].geometry.location.lat;
        //         console.log(json);
        //     } catch (error) {
        //         if (error.name === 'AbortError') {
        //             console.log('request was aborted');
        //         }
        //         else if (error.name === 'FetchError') {
        //             console.log('boooo');
        //         }
        //     }             
        // })();
        // let JSOn = fetch(dynURL)
        //         .then(response => response.json())
        //         .then(json => {
        //             gl.lng = json[0].geometry.location.lng;
        //             gl.lat = json[0].geometry.location.lat;
        //             console.log(json);
        //             return json; 
        //     }).catch(err => {
        //         console.error('fetch failed', err);
        // });
        return gl;
    };
    return GeoLocModel;
}());
exports.GeoLocModel = GeoLocModel;
//# sourceMappingURL=geolocModel.js.map