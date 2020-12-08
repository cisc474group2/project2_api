import express, { RequestHandler } from 'express';
import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { OtherController } from './otherController';

//Router for business portion of the API
export class OtherRouter extends AppRouter{
    static OtherController: OtherController=new OtherController();
    constructor(){super();}

    //called by the framework to add the routes for the business portion of the API
    setupRoutes(): void {      
        this.expressRouter.get('/weather/latlng/:lat/:lng',OtherRouter.OtherController.getLatLngWeather);
    }    
}