import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { EventsController } from "./eventsController";

//Router for events portion of the api
export class EventRouter extends AppRouter{
    static eventController: EventsController=new EventsController();
    constructor(){super();}

    //called by the framework to add the routes for the security portion of the API
    setupRoutes(): void {
        this.expressRouter.get('/events',EventRouter.eventController.getEvents);
        this.expressRouter.get('/:events/:id',EventRouter.eventController.getEventByID);
        this.expressRouter.post('/events',[SecurityMiddleware.RequireAuth],EventRouter.eventController.createEvent);
        this.expressRouter.put('/:events/:id',[SecurityMiddleware.RequireAuth],EventRouter.eventController.updateEvent);
        this.expressRouter.delete('/:events/:id',[SecurityMiddleware.RequireAuth],EventRouter.eventController.deleteEvent);
    }    
}