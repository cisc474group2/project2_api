import express, { RequestHandler } from 'express';
import { GeoLocModel } from './geolocModel';
import { Database } from '../../common/MongoDB';
import { Config } from '../../config';

export class GeoLocController {
    static db: Database = new Database(Config.url_elevated, "DEV");
    static eventsTable = 'EVENT';
    static earth_rad_mile = 3963.2;             //The radius for the earth in miles
    static default_distance_calculation = 10;   //Default radius for search, 10 miles

    //getEventsCenteredOnLngLat
    //sends the specific project as JSON with id=:id
    getEventsCenteredOnLngLat(req: express.Request, res: express.Response) {
        const lng_lat = req.params.lng_lat.replace('"', '').split(',').map((x) => parseFloat(x));
        GeoLocController.db.getRecords(GeoLocController.eventsTable, 
                                        {'event_geoloc': {$geoWithin: 
                                                            { $centerSphere: [[lng_lat[0],lng_lat[1]],
                                                                GeoLocController.default_distance_calculation/GeoLocController.earth_rad_mile] }
                                                                }
                                                            })
            .then((results) => res.send({ fn: 'getEventsCenteredOnLngLat', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    getEventsCenteredOnLngLatCustomRadius(req: express.Request, res: express.Response) {
        const lng_lat = req.params.lng_lat.replace('"', '').split(',').map((x) => parseFloat(x));
        const rad = parseFloat(req.params.rad.replace('"', ""));
        GeoLocController.db.getRecords(GeoLocController.eventsTable, 
                                        {'event_geoloc': {$geoWithin: 
                                                            { $centerSphere: [[lng_lat[0],lng_lat[1]],
                                                                rad/GeoLocController.earth_rad_mile] }
                                                                }
                                                            })
            .then((results) => res.send({ fn: 'getEventsCenteredOnLngLat', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

}