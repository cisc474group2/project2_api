import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { EventsController } from "./eventController";

//Router for events portion of the api
export class EventRouter extends AppRouter{
    static eventController: EventsController=new EventsController();
    constructor(){super();}

    //called by the framework to add the routes for the security portion of the API
    setupRoutes(): void {
        this.expressRouter.get('/',EventRouter.eventController.getEvents);
        this.expressRouter.get('/:id',EventRouter.eventController.getEventByID);
        this.expressRouter.post('/',EventRouter.eventController.createEvent);
        this.expressRouter.put('/:id',EventRouter.eventController.updateEvent);
        this.expressRouter.delete('/:id',EventRouter.eventController.deleteEvent);
    }    
}