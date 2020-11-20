import express, { RequestHandler } from 'express';
import { BusModel } from './busModel';
import { Database } from '../../common/MongoDB';
import { Config } from '../../config';

export class BusController {
    static db: Database = new Database(Config.url, "DEV");
    static userTable = 'USER';
    static businessKey = "B";

    //getAllBusinesses
    //sends a json object with all businesses in the database
    getAllBusinesses(req: express.Request, res: express.Response) {
        BusController.db.getRecords(BusController.userTable, { type: BusController.businessKey })
            .then((results) => res.send({ fn: 'getAllBusinesses', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }
    //getBusiness
    //sends the specific business as JSON with id=:id
    getBusiness(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        BusController.db.getOneRecord(BusController.userTable, { _id: id, TYPE:BusController.businessKey})
            .then((results) => res.send({ fn: 'getBusiness', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
    //getHostedEvents
    //sends a json object with all the hosted events by that business w/id=:id
    getHostedEvents(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        BusController.db.getOneRecord(BusController.userTable, { _id: id, type:BusController.businessKey})
            .then((results) => res.send({ fn: 'getHostedEvents', status: 'success', data: results.hostedEvents }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
}