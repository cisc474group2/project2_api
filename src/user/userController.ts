import express, { RequestHandler } from 'express';
import { UserModel } from './userModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';
//This is just an example of a second controller attached to the security module

export class UserController {
    static db: Database = new Database(Config.url_elevated, "users");
    static userTable = 'USER';
   
    //createUser
    //adds the user to the database
    createUser(req: express.Request, res: express.Response) {
        const proj: UserModel = UserModel.fromObject(req.body);

        UserController.db.addRecord(UserController.userTable, proj.toObject())
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

}