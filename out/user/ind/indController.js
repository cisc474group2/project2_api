"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndController = void 0;
var MongoDB_1 = require("../../common/MongoDB");
var config_1 = require("../../config");
var IndController = /** @class */ (function () {
    function IndController() {
    }
    //getAllIndividuals
    //sends a json object with all individuals in the databse
    IndController.prototype.getAllIndividuals = function (req, res) {
        IndController.db.getRecords(IndController.userTable, { type: IndController.individualKey })
            .then(function (results) { return res.send({ fn: 'getAllIndividuals', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getOneIndividual
    //sends the specific individual as JSON with id=:id
    IndController.prototype.getOneIndividual = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        IndController.db.getOneRecord(IndController.userTable, { _id: id, type: IndController.individualKey })
            .then(function (results) { return res.send({ fn: 'getIndividual', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    IndController.db = new MongoDB_1.Database(config_1.Config.url, "DEV");
    IndController.userTable = 'USER';
    IndController.individualKey = "I";
    return IndController;
}());
exports.IndController = IndController;
//# sourceMappingURL=indController.js.map