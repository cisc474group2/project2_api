import express, { RequestHandler } from 'express';
import { BusModel } from './busModel';
import { Database } from '../../common/MongoDB';
import { Config } from '../../config';
//This is just an example of a second controller attached to the security module

export class BusController {
    static db: Database = new Database(Config.url, "DEV");
    static userTable = 'USER';
    static businessKey = "B";

    //getProjects
    //sends a json object with all projects in the system that match :year
    getAllBusinesses(req: express.Request, res: express.Response) {
        BusController.db.getRecords(BusController.userTable, { TYPE: BusController.businessKey })
            .then((results) => res.send({ fn: 'getAllBusinesses', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }
    //getProject
    //sends the specific project as JSON with id=:id
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