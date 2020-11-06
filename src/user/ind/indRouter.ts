import express, { RequestHandler } from 'express';
import { AppRouter } from "../../common/AppRouter";
import { SecurityMiddleware } from "../../security/securityMiddleware";
import { IndController } from './indController';

//This is just an example second router to show how additional routers can be added
export class IndRouter extends AppRouter{
    static IndController: IndController=new IndController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        this.expressRouter.get('/',IndRouter.IndController.getAllIndividuals);
        this.expressRouter.get('/:id',IndRouter.IndController.getOneIndividual);
    }    
}