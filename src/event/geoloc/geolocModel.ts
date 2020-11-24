import { json } from 'body-parser';
import { textSpanContainsPosition } from 'typescript';
import { Config } from '../../config';
import axios from 'axios';

export class GeoLocModel{
    lng:number;
    lat:number;

    static fromObject(object:any):GeoLocModel{
        const gl:GeoLocModel=new GeoLocModel();
        gl.lng = object.lng;
        gl.lat = object.lat;
        return gl;
    }

    toObject():any{
        return {lng:this.lng, lat:this.lat};
    }

    public constructor(lng:number = 0.0, lat:number = 0.0) {
        this.lng = lng;
        this.lat = lat;
    }

    static googleGeoCoding(combinedAddress:string):Promise<GeoLocModel> {
        return new Promise(function (resolve, reject) {
            const addressComponents = combinedAddress.split('+');
            let dynURL = Config.GOOGLE_GEOCODING
            .replace('<<OUT>>', 'json')
            .replace('<<ADDR>', encodeURIComponent(addressComponents[0]) + 
                '+' + encodeURIComponent(addressComponents[2]) +
                '+' + encodeURIComponent(addressComponents[3]) +
                '+' + encodeURIComponent(addressComponents[4]))
            .replace('<<KEY>>', Config.GOOGLE_API);

            const axios = require('axios').default;
            let lng:number = 0.0;
            let lat:number = 0.0;
            axios.get(dynURL).then(function (responce:any) {
                console.log(responce);
                lng = responce.data.results[0].geometry.location.lng;
                lat = responce.data.results[0].geometry.location.lat;
                return resolve(new GeoLocModel(lng, lat));
            }).catch(function (error:any) {
                console.log(error);
                return reject(error);
            });
        });
    }
}