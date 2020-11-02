import express, { RequestHandler } from 'express';
import { AppRouter } from "../../common/AppRouter";
import { SecurityMiddleware } from "../../security/securityMiddleware";
import { BusController } from './busController';

//This is just an example second router to show how additional routers can be added
export class BusRouter extends AppRouter{
    static BusController: BusController=new BusController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        this.expressRouter.get('/',BusRouter.BusController.getAllBusinesses);
        this.expressRouter.get('/:id',BusRouter.BusController.getBusiness);
        this.expressRouter.delete('/:id/hosted_events',[SecurityMiddleware.RequireAuth],BusRouter.BusController.getHostedEvents);
    }    
}