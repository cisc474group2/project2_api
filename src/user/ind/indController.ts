import express, { RequestHandler } from 'express';
import { IndModel } from './indModel';
import { Database } from '../../common/MongoDB';
import { Config } from '../../config';


export class IndController {
    static db: Database = new Database(Config.url, "DEV");
    static userTable = 'USER';
    static individualKey = "I";

    //getAllIndividuals
    //sends a json object with all individuals in the databse
    getAllIndividuals(req: express.Request, res: express.Response) {
        IndController.db.getRecords(IndController.userTable, { type: IndController.individualKey })
            .then((results) => res.send({ fn: 'getAllIndividuals', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }
    //getOneIndividual
    //sends the specific individual as JSON with id=:id
    getOneIndividual(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        IndController.db.getOneRecord(IndController.userTable, { _id: id, type:IndController.individualKey})
            .then((results) => res.send({ fn: 'getIndividual', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
}