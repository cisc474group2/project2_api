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
    //getEventByCustomFactors
    //returns a specific event in the database as JSON with id: id
    EventsController.prototype.getEventByCustomFactors = function (req, res, lookupData) {
        EventsController.db.getOneRecord(EventsController.eventsTable, { bus_id: lookupData.bus_id,
            description: lookupData.description,
            event_address: lookupData.event_address,
            event_geoloc: lookupData.event_geoloc })
            .then(function (results) { return res.send({ fn: 'getEvent', status: 'success', data: results._id }).end(); })
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
                .then(function (result) {
                EventsController.db.getOneRecord(EventsController.eventsTable, { bus_id: event.bus_id,
                    description: event.description,
                    event_address: event.event_address,
                    event_geoloc: event.event_geoloc })
                    .then(function (results) { return res.send({ fn: 'getEvent', status: 'success', data: { _id: results._id } }).end(); })
                    .catch(function (reason) { return res.status(500).send(reason).end(); });
            })
                .catch(function (reason) { return res.status(500).send(reason).end(); });
            // .then((result: boolean) => res.send({ fn: 'createEvent', status: 'success', data: {_id: event._id}}).end())
            // .catch((reason) => res.status(500).send(reason).end());
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
    //deleteAttendee
    //deletes user from list of attendees
    EventsController.prototype.deleteAttendee = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        var registered_ind = [];
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then(function (results) {
            registered_ind = results.registered_ind;
            if (registered_ind == null)
                registered_ind = [];
            if (results.registered_ind.includes(data.registered_ind)) {
                var index = registered_ind.indexOf(data.registered_ind);
                registered_ind.splice(index, 1);
            }
            EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: { registered_ind: registered_ind, update_date: '<<DATE>>' } })
                .then(function (results) { return results ? (res.send({ fn: 'deleteAttendee', status: 'success' })) : (res.send({ fn: 'deleteAttendee', status: 'failure', data: 'Not found' })).end(); })
                .catch(function (err) { return res.send({ fn: 'deleteAttendee', status: 'failure', data: err }).end(); });
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
    //getBulkEventLookupByID
    //gets all the events with a matching ID.  Allows for bulk gathering of event information
    EventsController.prototype.getBulkEventLookupByID = function (req, res) {
        var ids = req.body.reg_events.map(function (id) {
            return MongoDB_1.Database.stringToId(id);
        });
        //console.log(ids);      
        EventsController.db.getRecords(EventsController.eventsTable, { _id: { $in: ids } })
            .then(function (results) { return res.send({ fn: 'getBulkEventLookupByID', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getEventsFilterQuery
    //will use the following filter parameters to build a query
    //title
    //geolocation
    //address
    //start_date
    //end_date
    //business owner
    EventsController.prototype.getEventsFilterQuery = function (req, res) {
        var obj_list = new Array();
        var count = 0;
        var title_obj = req.body.title;
        var bus_id_obj = req.body.bus_id;
        var geoloc_obj = req.body.event_geoloc;
        var address_obj = req.body.event_address;
        var start_obj = req.body.start_time;
        var end_obj = req.body.end_time;
        //Title Search Settings
        if (title_obj != undefined && title_obj.length == 1) {
            title_obj = { title: title_obj };
            obj_list.push(title_obj);
        }
        else if (title_obj != undefined && title_obj.length != 1) {
            title_obj = { title: { $in: title_obj } };
            obj_list.push(title_obj);
        }
        //Business Search Settings
        if (bus_id_obj != undefined && bus_id_obj.length == 1) {
            bus_id_obj = { bus_id: bus_id_obj };
            obj_list.push(bus_id_obj);
        }
        else if (bus_id_obj != undefined && bus_id_obj.length != 1) {
            bus_id_obj = { bus_id: { $in: bus_id_obj } };
            obj_list.push(bus_id_obj);
        }
        //Geoloc Search Settings
        var radius = (req.body.search_fields.includes('radius')) ?
            req.body.radius / EventsController.earth_rad_mile :
            EventsController.default_distance_calculation / EventsController.earth_rad_mile;
        if (geoloc_obj != undefined && geoloc_obj.length == 1) {
            geoloc_obj = { event_geoloc: geoloc_obj };
            obj_list.push(geoloc_obj);
        }
        else if (geoloc_obj != undefined && geoloc_obj.length != 1) {
            geoloc_obj = { event_geoloc: { $in: geoloc_obj } };
            obj_list.push(geoloc_obj);
        }
        if (address_obj != undefined && address_obj.length == 1) {
            address_obj = { event_address: address_obj };
            obj_list.push(address_obj);
        }
        else if (address_obj != undefined && address_obj.length != 1) {
            address_obj = { event_address: { $in: address_obj } };
            obj_list.push(address_obj);
        }
        if (start_obj != undefined && start_obj.length == 1) {
            start_obj = { start_date: start_obj };
            obj_list.push(start_obj);
        }
        else if (start_obj != undefined && start_obj.length != 1) {
            start_obj = { start_date: { $in: start_obj } };
            obj_list.push(start_obj);
        }
        if (end_obj != undefined && end_obj.length == 1) {
            end_obj = { end_date: end_obj };
            obj_list.push(end_obj);
        }
        else if (end_obj != undefined && end_obj.length != 1) {
            end_obj = { end_date: { $in: end_obj } };
            obj_list.push(end_obj);
        }
        var q = { $or: obj_list };
        EventsController.db.getRecords(EventsController.eventsTable, q)
            .then(function (results) { return res.send({ fn: 'getBulkEventLookupByID', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    EventsController.prototype.getTitleInfo = function (req, res) {
        var axios = require('axios').default;
        var googleURL = config_1.Config.GOOGLE_LATLNG_GEOCODING
            .replace('<<OUT>>', 'json')
            .replace('<<LAT>>', req.params.lat)
            .replace('<<LNG>>', req.params.lng)
            .replace('<<KEY>>', config_1.Config.GOOGLE_API);
        axios.get(googleURL).then(function (results) {
            res.send({ fn: 'getTitleInfo', status: 'success', data: results.data }).end();
        }).catch(function (error) {
            console.log(error);
        });
    };
    EventsController.db = new MongoDB_1.Database(config_1.Config.url_elevated, "DEV");
    EventsController.eventsTable = 'EVENT';
    EventsController.earth_rad_mile = 3963.2; //The radius for the earth in miles
    EventsController.default_distance_calculation = 10; //Default radius for search, 10 miles
    return EventsController;
}());
exports.EventsController = EventsController;
//# sourceMappingURL=eventController.js.map