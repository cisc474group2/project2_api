import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { EventsController } from "./eventController";
import { GeoLocRouter } from './geoloc/geolocRouter';

//Router for events portion of the API
export class EventRouter extends AppRouter{
    static eventController: EventsController=new EventsController();
    constructor(){super();}

    //called by the framework to add the routes for the events portion of the API
    setupRoutes(): void {
        this.addRouter('/geo',new GeoLocRouter());
        this.expressRouter.post('/bulk', EventRouter.eventController.getBulkEventLookupByID);
        this.expressRouter.get('/search', EventRouter.eventController.getEventsFilterQuery)
        this.expressRouter.get('/getTitleInfo/:lat/:lng', EventRouter.eventController.getTitleInfo);
       
        this.expressRouter.get('/',EventRouter.eventController.getEvents);
        this.expressRouter.get('/:id',EventRouter.eventController.getEventByID);
        this.expressRouter.post('/',[SecurityMiddleware.RequireAuth], EventRouter.eventController.createEvent);
        this.expressRouter.put('/:id',[SecurityMiddleware.RequireAuth],EventRouter.eventController.updateEvent);
        this.expressRouter.delete('/:id',EventRouter.eventController.deleteEvent);
        this.expressRouter.get('/:id/registered',EventRouter.eventController.getRegisteredInd);
        this.expressRouter.put('/:id/registered', EventRouter.eventController.updateAttendees);
        this.expressRouter.put('/:id/registered/delete', EventRouter.eventController.deleteAttendee);
    }    
}