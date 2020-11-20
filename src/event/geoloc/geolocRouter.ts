import { AppRouter } from "../../common/AppRouter";
import { SecurityMiddleware } from "../../security/securityMiddleware";
import { GeoLocController } from "./geolocController";

//Router for geolocation portion of the api
export class GeoLocRouter extends AppRouter{
    static geolocController: GeoLocController=new GeoLocController();
    constructor(){super();}

    //called by the framework to add the routes for the geolocation portion of the API
    setupRoutes(): void {
        this.expressRouter.get('/loc/:lng_lat',GeoLocRouter.geolocController.getEventsCenteredOnLngLat);
        this.expressRouter.get('/loc/:lng_lat/:rad',GeoLocRouter.geolocController.getEventsCenteredOnLngLatCustomRadius);
        this.expressRouter.get('/zip/:zip',GeoLocRouter.geolocController.getEventsCenteredOnZip);
        this.expressRouter.get('/zip/:zip/:rad',GeoLocRouter.geolocController.getEventsCenteredOnZipCustomRadius);
    }    
}