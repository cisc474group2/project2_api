import express, { RequestHandler } from 'express';
import { AppRouter } from "../../common/AppRouter";
import { SecurityMiddleware } from "../../security/securityMiddleware";
import { IndController } from './indController';

//Router for individual portion of the API
export class IndRouter extends AppRouter{
    static IndController: IndController=new IndController();
    constructor(){super();}

    //called by the framework to add the routes for the individual portion of the API
    setupRoutes(): void {      
        this.expressRouter.get('/',IndRouter.IndController.getAllIndividuals);
        this.expressRouter.get('/:id',IndRouter.IndController.getOneIndividual);
    }    
}