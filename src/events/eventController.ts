import express, { RequestHandler } from 'express';
import { EventsModel } from './eventModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class EventsController {
    static db: Database = new Database(Config.url, "events");
    static eventsTable = 'events';
    //getEvents
    //fix this
    getEvents(req: express.Request, res: express.Response) {
        const event_id = req.params.event_id;
        EventsController.db.getRecords(EventsController.eventsTable, { event_id : event_id })
            .then((results) => res.send({ fn: 'getEvents', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }
    //getEventByID
    //sends the specific project as JSON with id=:id
    getEventByID(req: express.Request, res: express.Response) {
        //const semester = req.params.semester;
        const event_id = Database.stringToId(req.params.event_id);
        EventsController.db.getOneRecord(EventsController.eventsTable, { event_id: event_id })
            .then((results) => res.send({ fn: 'getEvent', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
    //createEvent
    //adds the event to the database
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
        EventsController.db.updateRecord(EventsController.eventsTable, { _id: id }, { $set: req.body })
            .then((results) => results ? (res.send({ fn: 'updateEvent', status: 'success' })) : (res.send({ fn: 'updateEvent', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'updateEvent', status: 'failure', data: err }).end());

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