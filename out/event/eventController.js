"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
var eventModel_1 = require("./eventModel");
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var geolocModel_1 = require("./geoloc/geolocModel");
var EventsController = /** @class */ (function () {
    function EventsController() {
    }
    //getEvents
    //returns the list of all events in the database as a JSON
    EventsController.prototype.getEvents = function (req, res) {
        EventsController.db.getRecords(EventsController.eventsTable, {})
            .then(function (results) { return res.send({ fn: 'getEvents', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getEventByID
    //returns a specific event in the database as JSON with id: id
    EventsController.prototype.getEventByID = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then(function (results) { return res.send({ fn: 'getEvent', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getRegisteredInd
    //returns the list of registered attendees for the given event in the database as JSON with id: id
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
    //adds the event to the database with id: id
    EventsController.prototype.createEvent = function (req, res) {
        geolocModel_1.GeoLocModel.googleGeoCoding(req.body.event_address).then(function (result) {
            var event = eventModel_1.EventsModel.fromObject(req.body);
            event.event_geoloc = result;
            //Insert Event
            EventsController.db.addRecord(EventsController.eventsTable, event.toObject())
                .then(function (result) { return res.send({ fn: 'createEvent', status: 'success' }).end(); })
                .catch(function (reason) { return res.status(500).send(reason).end(); });
        }).catch(function (error) {
            console.log("Event not added\n" + error);
            res.status(500).send("Event not added\n" + error).end();
        });
    };
    //updateEvent
    //updates the event in the database with id :id
    EventsController.prototype.updateEvent = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        delete data.registered_ind;
        EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: 'updateEvent', status: 'success' })) : (res.send({ fn: 'updateEvent', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateEvent', status: 'failure', data: err }).end(); });
    };
    //updateAttendees
    //adds user to end of attendees list for given event in the database with id: id
    EventsController.prototype.updateAttendees = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        var registered_ind = [];
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then(function (results) {
            registered_ind = results.registered_ind;
            if (registered_ind == null)
                registered_ind = [];
            if (!results.registered_ind.includes(data.registered_ind)) {
                registered_ind.push(data.registered_ind);
            }
            EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: { registered_ind: registered_ind, update_date: '<<DATE>>' } })
                .then(function (results) { return results ? (res.send({ fn: 'updateAttendees', status: 'success' })) : (res.send({ fn: 'updateAttendees', status: 'failure', data: 'Not found' })).end(); })
                .catch(function (err) { return res.send({ fn: 'updateAttendees', status: 'failure', data: err }).end(); });
        })
            .catch(function (reason) {
            return res.status(500).send(reason).end();
        });
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