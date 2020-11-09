"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
var eventModel_1 = require("./eventModel");
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var EventsController = /** @class */ (function () {
    function EventsController() {
    }
    //getEvents
    //fix this
    EventsController.prototype.getEvents = function (req, res) {
        EventsController.db.getRecords(EventsController.eventsTable, {})
            .then(function (results) { return res.send({ fn: 'getEvents', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getEventByID
    //sends the specific project as JSON with id=:id
    EventsController.prototype.getEventByID = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then(function (results) { return res.send({ fn: 'getEvent', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //createEvent
    //adds the event to the database
    EventsController.prototype.createEvent = function (req, res) {
        var event = eventModel_1.EventsModel.fromObject(req.body);
        EventsController.db.addRecord(EventsController.eventsTable, event.toObject())
            .then(function (result) { return res.send({ fn: 'createEvent', status: 'success' }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //updateEvent
    //updates the event in the database with id :id
    EventsController.prototype.updateEvent = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: 'updateEvent', status: 'success' })) : (res.send({ fn: 'updateEvent', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateEvent', status: 'failure', data: err }).end(); });
    };
    //deleteEvent
    //deletes the event in the database with id :id
    EventsController.prototype.deleteEvent = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        EventsController.db.deleteRecord(EventsController.eventsTable, { _id: id })
            .then(function (results) { return results ? (res.send({ fn: 'deleteEvent', status: 'success' })) : (res.send({ fn: 'deleteEvent', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    EventsController.db = new MongoDB_1.Database(config_1.Config.url, "DEV");
    EventsController.eventsTable = 'EVENT';
    return EventsController;
}());
exports.EventsController = EventsController;
//# sourceMappingURL=eventController.js.map