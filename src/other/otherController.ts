import express, { RequestHandler } from 'express';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class OtherController {

    //getAllBusinesses
    //sends a json object with all businesses in the database
    getLatLngWeather(req: express.Request, res: express.Response) {
        const axios = require('axios').default;
        const id = Database.stringToId(req.params.id);
        let weatherURL = Config.WEATHER_PATH
            .replace('<<LAT>>', req.params.lat)
            .replace('<<LNG>>', req.params.lng)
            .replace('<<KEY>>', Config.WEATHER_API_KEY);
        axios.get(weatherURL).then(function (results:any) {
            res.send({fn: 'getLatLngWeather', status: 'success', data: results.data}).end()
        }).catch(function (error:any) {
            console.log(error);
        });
    }
}