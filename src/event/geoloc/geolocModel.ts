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

    async testMeth(dynURL:string) {
        try {
            const axios = require('axios').default;
            const response = await axios.get(dynURL);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            console.log();
        }
    }

    // static googleGeoCoding(combinedAddress:string) {
    //     const addressComponents = combinedAddress.split('+');
    //     let dynURL = Config.GOOGLE_GEOCODING
    //             .replace('<<OUT>>', 'json')
    //             .replace('<<ADDR>>', encodeURIComponent(addressComponents[0]) + 
    //                         '+' + encodeURIComponent(addressComponents[2]) + 
    //                         '+' + encodeURIComponent(addressComponents[3]) + 
    //                         '+' + encodeURIComponent(addressComponents[4]))
    //             .replace('<<KEY>>', Config.GOOGLE_API);        
        

    //     const axios = require('axios').default;
    //     let lng:number = 0.0;
    //     let lat:number = 0.0;
    //     axios.get(dynURL).then(function (responce:any) {
    //         console.log(responce);
    //         lng = responce.data.results[0].geometry.location.lng;
    //         lat = responce.data.results[0].geometry.location.lat;
    //     }).catch(function (error:any) {
    //         console.log(error);
    //     }).then(function () {
    //         console.log("hit correct return");
    //         return new GeoLocModel(lng, lat);
    //     });
    //     // const https = require('https');
    //     // https.get(dynURL, (res:any) => {
    //     //     console.log('statusCode:', res.statusCode);
    //     //     console.log('headers:', res.headers);
            
    //     //     res.on('data', (d:any) => {
    //     //         process.stdout.write(d);
    //     //     });
    //     // }).on('error', (e:any) => {
    //     //     console.error(e)
    //     // })
    //     // const request = require('request');
    //     // request(dynURL, { json: true }, 
    //     //     (err: any, res: any, body: { results:any }) => { 
    //     //         if (err) { 
    //     //             return console.log(err); } 
    //     //         console.log(body.results[0].geometry.location);
    //     //         gl.lng = body.results[0].geometry.location.lng;
    //     //         gl.lat = body.results[0].geometry.location.lat;
    //     //     });
    //     return new GeoLocModel(lng, lat);
   // }
}