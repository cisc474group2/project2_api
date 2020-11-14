"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoLocController = void 0;
var MongoDB_1 = require("../../common/MongoDB");
var config_1 = require("../../config");
var GeoLocController = /** @class */ (function () {
    function GeoLocController() {
    }
    //getEventsCenteredOnLngLat
    //sends the specific project as JSON with id=:id
    GeoLocController.prototype.getEventsCenteredOnLngLat = function (req, res) {
        var lng_lat = req.params.lng_lat.replace('"', '').split(',').map(function (x) { return parseFloat(x); });
        GeoLocController.db.getRecords(GeoLocController.eventsTable, { 'event_geoloc': { $geoWithin: { $centerSphere: [[lng_lat[0], lng_lat[1]],
                        GeoLocController.default_distance_calculation / GeoLocController.earth_rad_mile] }
            }
        })
            .then(function (results) { return res.send({ fn: 'getEventsCenteredOnLngLat', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    GeoLocController.prototype.getEventsCenteredOnLngLatCustomRadius = function (req, res) {
        var lng_lat = req.params.lng_lat.replace('"', '').split(',').map(function (x) { return parseFloat(x); });
        var rad = parseFloat(req.params.rad.replace('"', ""));
        GeoLocController.db.getRecords(GeoLocController.eventsTable, { 'event_geoloc': { $geoWithin: { $centerSphere: [[lng_lat[0], lng_lat[1]],
                        rad / GeoLocController.earth_rad_mile] }
            }
        })
            .then(function (results) { return res.send({ fn: 'getEventsCenteredOnLngLat', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    GeoLocController.db = new MongoDB_1.Database(config_1.Config.url_elevated, "DEV");
    GeoLocController.eventsTable = 'EVENT';
    GeoLocController.earth_rad_mile = 3963.2; //The radius for the earth in miles
    GeoLocController.default_distance_calculation = 10; //Default radius for search, 10 miles
    return GeoLocController;
}());
exports.GeoLocController = GeoLocController;
//# sourceMappingURL=geolocController.js.map