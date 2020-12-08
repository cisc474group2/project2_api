import express from 'express'
import { AppRouter } from './common/AppRouter';
import { SecurityRouter } from './security/securityRouter';
import { EventRouter } from './event/eventRouter';
import { UserRouter } from './user/userRouter';
import { OtherRouter } from './other/otherRouter';

//root router for the API

export class MainRouter extends AppRouter{
    constructor(){super();}

    //adds the child routers to various paths to form the overall API. 
    setupRoutes(): void {
        // let app = express();

        // app.use(app.use(function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        // }));

        this.addRouter('/security',new SecurityRouter());        
        this.addRouter('/events', new EventRouter());
        this.addRouter('/users', new UserRouter());
        this.addRouter('/other', new OtherRouter());

    }
    
}