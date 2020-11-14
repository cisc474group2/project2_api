import { AppRouter } from "../../common/AppRouter";
import { SecurityMiddleware } from "../../security/securityMiddleware";
import { GeoLocController } from "./geolocController";

//Router for events portion of the api
export class GeoLocRouter extends AppRouter{
    static geolocController: GeoLocController=new GeoLocController();
    constructor(){super();}

    //called by the framework to add the routes for the security portion of the API
    setupRoutes(): void {
        this.expressRouter.get('/:lng_lat',GeoLocRouter.geolocController.getEventsCenteredOnLngLat);
        this.expressRouter.get('/:lng_lat/:rad',GeoLocRouter.geolocController.getEventsCenteredOnLngLatCustomRadius);
    }    
}