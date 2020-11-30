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
 //       delete data.reg_events;
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

    //updateUserEvents
    //updates the user info in the database with id :id
    updateUserEvents(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const data = req.body;
        delete data.authUser;
        var reg_events = [];

        UserController.db.getOneRecord(UserController.userTable, { _id: id })
            .then(results => {
                reg_events=results.reg_events;
                if (reg_events==null) reg_events=[];
                if(!results.reg_events.includes(data.reg_events)){
                    reg_events.push(data.reg_events);
                }
                UserController.db.updateRecord(UserController.userTable, { _id: id }, { $set: {reg_events: reg_events, update_date: '<<DATE>>' } })
                    .then((results) => results ? (res.send({ fn: 'updateUserEvents', status: 'success' })) : (res.send({ fn: 'updateUserEvents', status: 'failure', data: 'Not found' })).end())
                    .catch(err => res.send({ fn: 'updateUserEvents', status: 'failure', data: err })
                    .end());
            })
            .catch((reason) => {
                return res.status(500).send(reason).end();
            });
    }

}