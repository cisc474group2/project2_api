import express, { RequestHandler } from 'express';
import { AppRouter } from "../../common/AppRouter";
import { SecurityMiddleware } from "../../security/securityMiddleware";
import { BusController } from './busController';

//Router for business portion of the API
export class BusRouter extends AppRouter{
    static BusController: BusController=new BusController();
    constructor(){super();}

    //called by the framework to add the routes for the business portion of the API
    setupRoutes(): void {      
        this.expressRouter.get('/',BusRouter.BusController.getAllBusinesses);
        this.expressRouter.get('/:id',BusRouter.BusController.getBusiness);
        this.expressRouter.delete('/:id/hosted_events',[SecurityMiddleware.RequireAuth],BusRouter.BusController.getHostedEvents);
    }    
}