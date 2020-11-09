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
    //getRegisteredInd
    //returns the list of registered attendees for the given event
    EventsController.prototype.getRegisteredInd = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        EventsController.db.getRecords(EventsController.eventsTable, { _id: id })
            .then(function (results) {
            //extracts just the registered individuals list
            var event_attendees = results.map(function (x) { return x.registered_ind; });
            res.send({ fn: 'getRegisteredInd', status: 'success', data: { registered_ind: event_attendees } });
        })
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
    //updateAttendees
    //adds user to end of attendees list
    EventsController.prototype.updateAttendees = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        var registered_ind = '';
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then(function (results) {
            //extracts just the registered individuals list
            registered_ind = results.map(function (x) { return x.registered_ind; });
            res.send({ fn: 'getRegisteredInd', status: 'success', data: { registered_ind: registered_ind } });
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
        var new_list = registered_ind + data;
        EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: new_list })
            .then(function (results) { return results ? (res.send({ fn: 'updateAttendees', status: 'success' })) : (res.send({ fn: 'updateAttendees', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateAttendees', status: 'failure', data: err }).end(); });
    };
    //deleteEvent
    //deletes the event in the database with id :id
    EventsController.prototype.deleteEvent = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        EventsController.db.deleteRecord(EventsController.eventsTable, { _id: id })
            .then(function (results) { return results ? (res.send({ fn: 'deleteEvent', status: 'success' })) : (res.send({ fn: 'deleteEvent', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    EventsController.db = new MongoDB_1.Database(config_1.Config.url_elevated, "DEV");
    EventsController.eventsTable = 'EVENT';
    return EventsController;
}());
exports.EventsController = EventsController;
//# sourceMappingURL=eventController.js.map