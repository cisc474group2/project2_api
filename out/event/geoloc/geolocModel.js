"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    GeoLocModel.prototype.testMeth = function (dynURL) {
        return __awaiter(this, void 0, void 0, function () {
            var axios_1, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        axios_1 = require('axios').default;
                        return [4 /*yield*/, axios_1.get(dynURL)];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        console.log();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeoLocModel.googleGeoCoding = function (combinedAddress) {
        var addressComponents = combinedAddress.split('+');
        var dynURL = config_1.Config.GOOGLE_GEOCODING
            .replace('<<OUT>>', 'json')
            .replace('<<ADDR>>', encodeURIComponent(addressComponents[0]) +
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
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            console.log("hit correct return");
            return new GeoLocModel(lng, lat);
        });
        // const https = require('https');
        // https.get(dynURL, (res:any) => {
        //     console.log('statusCode:', res.statusCode);
        //     console.log('headers:', res.headers);
        //     res.on('data', (d:any) => {
        //         process.stdout.write(d);
        //     });
        // }).on('error', (e:any) => {
        //     console.error(e)
        // })
        // const request = require('request');
        // request(dynURL, { json: true }, 
        //     (err: any, res: any, body: { results:any }) => { 
        //         if (err) { 
        //             return console.log(err); } 
        //         console.log(body.results[0].geometry.location);
        //         gl.lng = body.results[0].geometry.location.lng;
        //         gl.lat = body.results[0].geometry.location.lat;
        //     });
        return new GeoLocModel(lng, lat);
    };
    return GeoLocModel;
}());
exports.GeoLocModel = GeoLocModel;
//# sourceMappingURL=geolocModel.js.map