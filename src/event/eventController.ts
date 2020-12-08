import express, { RequestHandler } from 'express';
import { EventsModel } from './eventModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';
import { GeoLocModel } from './geoloc/geolocModel';

export class EventsController {
    static db: Database = new Database(Config.url_elevated, "DEV");
    static eventsTable = 'EVENT';
    static earth_rad_mile = 3963.2;             //The radius for the earth in miles
    static default_distance_calculation = 10;   //Default radius for search, 10 miles


    //getEvents
    //returns the list of all events in the database as a JSON
    getEvents(req: express.Request, res: express.Response) {
        EventsController.db.getRecords(EventsController.eventsTable, {})
            .then((results) => res.send({ fn: 'getEvents', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }
    //getEventByID
    //returns a specific event in the database as JSON with id: id
    getEventByID(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then((results) => res.send({ fn: 'getEvent', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
    //getEventByCustomFactors
    //returns a specific event in the database as JSON with id: id
    getEventByCustomFactors(req: express.Request, res: express.Response, lookupData:EventsModel) {
        EventsController.db.getOneRecord(EventsController.eventsTable, { bus_id: lookupData.bus_id,
                                                                         description: lookupData.description,
                                                                         event_address: lookupData.event_address,
                                                                         event_geoloc: lookupData.event_geoloc})
            .then((results) => res.send({ fn: 'getEvent', status: 'success', data: results._id }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
    //getRegisteredInd
    //returns the list of registered attendees for the given event in the database as JSON with id: id
    getRegisteredInd(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        EventsController.db.getRecords(EventsController.eventsTable, { _id: id })
            .then(results => {
                //extracts just the registered individuals list
                let event_attendees = results.map((x: any) => x.registered_ind);
                res.send({ fn: 'getRegisteredInd', status: 'success', data: { registered_ind: event_attendees } })
            })
            .catch((reason) => res.status(500).send(reason).end());
    }
    //createEvent
    //adds the event to the database with id: id
    createEvent(req: express.Request, res: express.Response) {
        GeoLocModel.googleGeoCoding(req.body.event_address).then(result => {
            const event: EventsModel = EventsModel.fromObject(req.body);
            event.event_geoloc = result;
            
            //Insert Event
            EventsController.db.addRecord(EventsController.eventsTable, event.toObject())
            .then((result: boolean) => {
                EventsController.db.getOneRecord(EventsController.eventsTable, 
                    {   bus_id: event.bus_id,
                        description: event.description,
                        event_address: event.event_address,
                        event_geoloc: event.event_geoloc})
                .then((results) => res.send({ fn: 'getEvent', status: 'success', data: {_id: results._id} }).end())
                .catch((reason) => res.status(500).send(reason).end());
            })
            .catch((reason) => res.status(500).send(reason).end());
            // .then((result: boolean) => res.send({ fn: 'createEvent', status: 'success', data: {_id: event._id}}).end())
            // .catch((reason) => res.status(500).send(reason).end());
        }).catch(error => {
            console.log("Event not added\n" + error);
            res.status(500).send("Event not added\n" + error).end();
        });

        
        
    }
    //updateEvent
    //updates the event in the database with id :id
    updateEvent(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const data = req.body;
        delete data.authUser;
        delete data.registered_ind;
        EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: req.body })
            .then((results) => results ? (res.send({ fn: 'updateEvent', status: 'success' })) : (res.send({ fn: 'updateEvent', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'updateEvent', status: 'failure', data: err }).end());

    }
    //updateAttendees
    //adds user to end of attendees list for given event in the database with id: id
    updateAttendees(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const data = req.body;
        delete data.authUser;
        var registered_ind = [];
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then(results => {
                registered_ind=results.registered_ind;
                if (registered_ind==null) registered_ind=[];
                if(!results.registered_ind.includes(data.registered_ind)){
                    registered_ind.push(data.registered_ind);
                }
                EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: {registered_ind: registered_ind, update_date: '<<DATE>>' }})
                    .then((results) => results ? (res.send({ fn: 'updateAttendees', status: 'success' })) : (res.send({ fn: 'updateAttendees', status: 'failure', data: 'Not found' })).end())
                    .catch(err => res.send({ fn: 'updateAttendees', status: 'failure', data: err }).end());
            })
            .catch((reason) => {
                return res.status(500).send(reason).end();
            });
    }
    //deleteAttendee
    //deletes user from list of attendees
    deleteAttendee(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const data = req.body;
        delete data.authUser;
        var registered_ind = [];
        EventsController.db.getOneRecord(EventsController.eventsTable, { _id: id })
            .then(results => {
                registered_ind=results.registered_ind;
                if (registered_ind==null) registered_ind=[];
                if(results.registered_ind.includes(data.registered_ind)){
                    var index = registered_ind.indexOf(data.registered_ind);
                    registered_ind.splice(index, 1);
                }
                EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: {registered_ind: registered_ind, update_date: '<<DATE>>' }})
                    .then((results) => results ? (res.send({ fn: 'deleteAttendee', status: 'success' })) : (res.send({ fn: 'deleteAttendee', status: 'failure', data: 'Not found' })).end())
                    .catch(err => res.send({ fn: 'deleteAttendee', status: 'failure', data: err }).end());
            })
            .catch((reason) => {
                return res.status(500).send(reason).end();
            });
    }
    //deleteEvent
    //deletes the event in the database with id :id
    deleteEvent(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        EventsController.db.deleteRecord(EventsController.eventsTable, { _id: id })
            .then((results) => results ? (res.send({ fn: 'deleteEvent', status: 'success' })) : (res.send({ fn: 'deleteEvent', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
    
    //getBulkEventLookupByID
    //gets all the events with a matching ID.  Allows for bulk gathering of event information
    getBulkEventLookupByID(req: express.Request, res: express.Response) {
        let ids = req.body.reg_events.map((id:string) => { 
            return Database.stringToId(id);
        });
        //console.log(ids);      

        EventsController.db.getRecords(EventsController.eventsTable, { _id: {$in : ids} })
            .then((results) => res.send({ fn: 'getBulkEventLookupByID', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    //getEventsFilterQuery
    //will use the following filter parameters to build a query
        //title
        //geolocation
        //address
        //start_date
        //end_date
        //business owner
    getEventsFilterQuery(req: express.Request, res: express.Response) {
        let obj_list:Array<any> = new Array<any>();
        let count = 0;

        let title_obj = req.body.title;
        let bus_id_obj = req.body.bus_id;
        let geoloc_obj = req.body.event_geoloc;
        let address_obj = req.body.event_address;
        let start_obj = req.body.start_time;
        let end_obj = req.body.end_time;        

        //Title Search Settings
        if (title_obj != undefined && title_obj.length == 1) {
            title_obj = { title: title_obj};
            obj_list.push(title_obj);
        } else if (title_obj != undefined && title_obj.length != 1) {
            title_obj = { title: {$in : title_obj}};
            obj_list.push(title_obj);
        }

        //Business Search Settings
        if (bus_id_obj != undefined && bus_id_obj.length == 1) {
            bus_id_obj = { bus_id: bus_id_obj};
            obj_list.push(bus_id_obj);
        } else if (bus_id_obj != undefined && bus_id_obj.length != 1) {
            bus_id_obj = { bus_id: {$in : bus_id_obj}};
            obj_list.push(bus_id_obj);
        }

        //Geoloc Search Settings
        let radius = (req.body.search_fields.includes('radius')) ?
            req.body.radius/EventsController.earth_rad_mile :
            EventsController.default_distance_calculation/EventsController.earth_rad_mile;
        if (geoloc_obj != undefined && geoloc_obj.length == 1) {
            geoloc_obj = { event_geoloc: geoloc_obj};
            obj_list.push(geoloc_obj);
        } else if (geoloc_obj != undefined && geoloc_obj.length != 1) {
            geoloc_obj = { event_geoloc: {$in : geoloc_obj}};
            obj_list.push(geoloc_obj);
        }

        if (address_obj != undefined && address_obj.length == 1) {
            address_obj = { event_address: address_obj};
            obj_list.push(address_obj);
        } else if (address_obj != undefined && address_obj.length != 1) {
            address_obj = { event_address: {$in : address_obj}};
            obj_list.push(address_obj);
        }

        if (start_obj != undefined && start_obj.length == 1) {
            start_obj = { start_date: start_obj};
            obj_list.push(start_obj);
        } else if (start_obj != undefined && start_obj.length != 1) {
            start_obj = { start_date: {$in : start_obj}};
            obj_list.push(start_obj);
        }

        if (end_obj != undefined && end_obj.length == 1) {
            end_obj = { end_date: end_obj};
            obj_list.push(end_obj);
        } else if (end_obj != undefined && end_obj.length != 1) {
            end_obj = { end_date: {$in : end_obj}};
            obj_list.push(end_obj);
        }

        let q = { $or : obj_list};

        EventsController.db.getRecords(EventsController.eventsTable, q)
            .then((results) => res.send({ fn: 'getBulkEventLookupByID', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    getTitleInfo(req: express.Request, res: express.Response) {
        const axios = require('axios').default;
        let googleURL = Config.GOOGLE_LATLNG_GEOCODING
            .replace('<<OUT>>', 'json')
            .replace('<<LAT>>', req.params.lat)
            .replace('<<LNG>>', req.params.lng)
            .replace('<<KEY>>', Config.GOOGLE_API);
        
        axios.get(googleURL).then(function (results:any) {
            res.send({fn: 'getTitleInfo', status: 'success', data: results.data}).end()
        }).catch(function (error:any) {
            console.log(error);
        });
    }
}