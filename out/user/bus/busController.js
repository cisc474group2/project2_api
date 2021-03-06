"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusController = void 0;
var MongoDB_1 = require("../../common/MongoDB");
var config_1 = require("../../config");
var BusController = /** @class */ (function () {
    function BusController() {
    }
    //getAllBusinesses
    //sends a json object with all businesses in the database
    BusController.prototype.getAllBusinesses = function (req, res) {
        BusController.db.getRecords(BusController.userTable, { type: BusController.businessKey })
            .then(function (results) { return res.send({ fn: 'getAllBusinesses', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getBusiness
    //sends the specific business as JSON with id=:id
    BusController.prototype.getBusiness = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        BusController.db.getOneRecord(BusController.userTable, { _id: id, type: BusController.businessKey })
            .then(function (results) { return res.send({ fn: 'getBusiness', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getHostedEvents
    //sends a json object with all the hosted events by that business w/id=:id
    BusController.prototype.getHostedEvents = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        BusController.db.getOneRecord(BusController.userTable, { _id: id, type: BusController.businessKey })
            .then(function (results) { return res.send({ fn: 'getHostedEvents', status: 'success', data: results.hostedEvents }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    BusController.db = new MongoDB_1.Database(config_1.Config.url, "DEV");
    BusController.userTable = 'USER';
    BusController.businessKey = "B";
    return BusController;
}());
exports.BusController = BusController;
//# sourceMappingURL=busController.js.map