import express, { RequestHandler } from 'express';
import { UserModel } from './userModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class UserController {
    static db: Database = new Database(Config.url_elevated, "DEV");
    static userTable = 'USER';
   
    //createUser
    //adds the user to the database
    createUser(req: express.Request, res: express.Response) {
        const user: UserModel = UserModel.fromObject(req.body);
    
        UserController.db.addRecord(UserController.userTable, user.toObject())
            .then((result: boolean) => res.send({ fn: 'createUser', status: 'success' }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    //updateUser
    //updates the user info in the database with id :id
    updateUser(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const data = req.body;
        delete data.authUser;
        UserController.db.updateRecord(UserController.userTable, { _id: id }, { $set: req.body })
            .then((results) => results ? (res.send({ fn: 'updateUser', status: 'success' })) : (res.send({ fn: 'updateUser', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'updateUser', status: 'failure', data: err }).end());

    }
    //deleteUser
    //deletes the user in the database with id :id
    deleteUser(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        UserController.db.deleteRecord(UserController.userTable, { _id: id })
            .then((results) => results ? (res.send({ fn: 'deleteUser', status: 'success' })) : (res.send({ fn: 'deleteUser', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    //getType
    //gets the type of the user in the database with id: id
    public getType(req: express.Request, res: express.Response){
        const id = Database.stringToId(req.params.id);
        UserController.db.getOneRecord(UserController.userTable, { _id: id })
            .then((results) => res.send({ fn: 'getType', status: 'success', data: results.type }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

}