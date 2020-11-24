import express, { RequestHandler } from 'express';
import { EventsModel } from './eventModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class EventsController {
    static db: Database = new Database(Config.url_elevated, "DEV");
    static eventsTable = 'EVENT';
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
        const event: EventsModel = EventsModel.fromObject(req.body);
        
        EventsController.db.addRecord(EventsController.eventsTable, event.toObject())
            .then((result: boolean) => res.send({ fn: 'createEvent', status: 'success' }).end())
            .catch((reason) => res.status(500).send(reason).end());
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
    //deleteEvent
    //deletes the event in the database with id :id
    deleteEvent(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        EventsController.db.deleteRecord(EventsController.eventsTable, { _id: id })
            .then((results) => results ? (res.send({ fn: 'deleteEvent', status: 'success' })) : (res.send({ fn: 'deleteEvent', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

}