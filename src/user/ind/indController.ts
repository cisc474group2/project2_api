import express, { RequestHandler } from 'express';
import { IndModel } from './indModel';
import { Database } from '../../common/MongoDB';
import { Config } from '../../config';
//This is just an example of a second controller attached to the security module

export class IndController {
    static db: Database = new Database(Config.url, "DEV");
    static userTable = 'USER';
    static individualKey = "I";

    //getProjects
    //sends a json object with all projects in the system that match :year
    getAllIndividuals(req: express.Request, res: express.Response) {
        IndController.db.getRecords(IndController.userTable, { TYPE: IndController.individualKey })
            .then((results) => res.send({ fn: 'getAllIndividuals', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }
    //getProject
    //sends the specific project as JSON with id=:id
    getOneIndividual(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        IndController.db.getOneRecord(IndController.userTable, { _id: id, TYPE:IndController.individualKey})
            .then((results) => res.send({ fn: 'getIndividual', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
}