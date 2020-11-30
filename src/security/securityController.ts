import express from 'express';
import jwt from 'jsonwebtoken';
import { Config } from '../config';
import { UserModel } from '../user/userModel';
import { Database } from '../common/MongoDB';
import { BusModel } from '../user/bus/busModel';
import { IndModel } from '../user/ind/indModel';
import { GeoLocModel } from '../event/geoloc/geolocModel';

//Implementation of security endpoints

export class SecurityController {
    static db: Database = new Database(Config.url_elevated, "DEV");
    static usersTable = 'USER';

    //login - POST
    //expects email and password fields to be set in the body of the post request
    //sends a token to the caller on success, 401 on failure
    public login(req: express.Request, res: express.Response, next: express.NextFunction) {
        SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
            .then((userRecord: any) => {
                if (!userRecord) return res.sendStatus(401).end();
                const usr: UserModel = UserModel.fromObject(userRecord);
                if (!usr.validatePassword(req.body.password)) return res.sendStatus(401).end();
                const token = jwt.sign(usr.toObject(), Config.secret, { expiresIn: Config.tokenLife });
                res.send({ fn: 'login', status: 'success', data: { token: token,user: {email: req.body.email} } }).end();
            }).catch(err => res.sendStatus(500).end());
    }

    //register - POST
    //expects email and password fields to be set in the body of the post request
    //sends a success message to caller on success, or a failure status code on failure
    register(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user: UserModel = new UserModel(req.body.email, req.body.password);
        const user_type: string = req.body.type;
        let type_obj: IndModel | BusModel | null = null;

        if (user_type == "I") {
            type_obj = new IndModel();
            type_obj.fName = req.body.type_obj.first_name;
            type_obj.lName = req.body.type_obj.last_name;
            type_obj.zip = req.body.type_obj.zip;
        }
        else if (user_type == "B") {
            type_obj = new BusModel();
            type_obj.busName = req.body.type_obj.bus_name;
            type_obj.cName = req.body.type_obj.contact_name;
            type_obj.cPhone = req.body.type_obj.contact_phone;
            type_obj.cEmail = req.body.type_obj.contact_email;
            
            //type_obj.geoloc = GeoLocModel.googleGeoCoding(req.body.type_obj.bus_address);
            //type_obj.geoloc.lng = req.body.type_obj.geoloc.lng;
            //type_obj.geoloc.lat = req.body.type_obj.geoloc.lat;
            type_obj.mailAddress = req.body.type_obj.bus_address;
            console.log("finished making entry");
        }
        else {
            type_obj = null;
        }
        //Add if statement here for diff types
        user.type = user_type;
        user.type_obj = type_obj;
        
        SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
            .then((userRecord: any) => {
                if (userRecord) return res.status(400).send({ fn: 'register', status: 'failure', data: 'User Exits' }).end();
                SecurityController.db.addRecord(SecurityController.usersTable, user.toObject()).then((result: boolean) => {
                    SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
                        .then((userRecord: any) => {
                            if (!userRecord) return res.sendStatus(401).end();
                            const usr: UserModel = UserModel.fromObject(userRecord);
                            if (!usr.validatePassword(req.body.password)) return res.sendStatus(401).end();
                            const token = jwt.sign(usr.toObject(), Config.secret, { expiresIn: Config.tokenLife });
                            res.send({ fn: 'login', status: 'success', data: { token: token,user: {email: req.body.email} } }).end()});
                    //res.send({ fn: 'register', status: 'success' }).end();
                }).catch((reason) => res.sendStatus(500).end());
            }).catch((reason) => res.sendStatus(500).end());
    }
    //authorize - GET
    //this code actually does nothing, but if it is secured at the route level, it will return the email address for the token that
    //was returned.  This is used to verify a token by a client application
    //returns the users email on success
    authorize(req: express.Request, res: express.Response, next: express.NextFunction) {
        //validate that req.authUser exists, if so, return the user's email address.
        console.log();
        res.send({ fn: 'authorize', status: 'success', data:{email: req.body.authUser.email, type:req.body.authUser.type} }).end();
    }
    //changePwd - POST
    //chages the password of the user represented in the token.  Expects password in the body of the POST
    //returns a success messager to the client on success, a failure status code on failure
    changePwd(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.body.password) res.status(400).send({ fn: 'changePwd', status: 'failure' }).end();
        const user: UserModel = new UserModel(req.body.authUser.email, req.body.password);
        SecurityController.db.updateRecord(SecurityController.usersTable, {email: user.email},{ $set: {password: user.password }}).then((result:Boolean)=>{
            if (result)
                res.send({ fn: 'changePwd', status: 'success' }).end();
            else 
                res.status(400).send({ fn: 'changePwd', status: 'failure' }).end();
        }).catch(err=>res.send({ fn: 'changePwd', status: 'failure', data:err }).end());
    }

}