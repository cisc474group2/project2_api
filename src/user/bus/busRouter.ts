import express, { RequestHandler } from 'express';
import { AppRouter } from "../../common/AppRouter";

//This is just an example second router to show how additional routers can be added
export class BusModel extends AppRouter{
    static projController: BusModel=new BusModel();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        //
    }    
}