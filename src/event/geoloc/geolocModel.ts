import { json } from 'body-parser';
import { Config } from '../../config';

export class GeoLocModel{
    lng = 0.0;
    lat = 0.0;

    static fromObject(object:any):GeoLocModel{
        const gl:GeoLocModel=new GeoLocModel();
        gl.lng = object.lng;
        gl.lat = object.lat;
        return gl;
    }
    toObject():any{
        return {lng:this.lng, lat:this.lat};
    }

    static googleGeoCoding(combinedAddress:string) {
        const gl:GeoLocModel = new GeoLocModel();
        const addressComponents = combinedAddress.split('+');
        let dynURL = Config.GOOGLE_GEOCODING
                .replace('<<OUT>>', 'json')
                .replace('<<ADDR>>', encodeURIComponent(addressComponents[0]) + 
                            '+' + encodeURIComponent(addressComponents[2]) + 
                            '+' + encodeURIComponent(addressComponents[3]) + 
                            '+' + encodeURIComponent(addressComponents[4]))
                .replace('<<KEY>>', Config.GOOGLE_API);


        const request = require('request');
        request
        .get(dynURL)
        .on('response', function(response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type']) // 'image/png'
        });

                // request(dynURL,
                // { json: true }, 
                // (err:any, res:any, body:any) => { 
                //     if (err) { 
                //         return console.log(err); } 
                //     console.log(body.url);
                //     console.log(body.explanation); 
                // }); 
        // (async () => {
        //     try {
        //         const response = await fetch(dynURL);
        //         const json = await response.json();
        //         gl.lng = json.results[0].geometry.location.lng;
        //         gl.lat = json.results[0].geometry.location.lat;
        //         console.log(json);
        //     } catch (error) {
        //         if (error.name === 'AbortError') {
        //             console.log('request was aborted');
        //         }
        //         else if (error.name === 'FetchError') {
        //             console.log('boooo');
        //         }
        //     }             
        // })();

        // let JSOn = fetch(dynURL)
        //         .then(response => response.json())
        //         .then(json => {
        //             gl.lng = json[0].geometry.location.lng;
        //             gl.lat = json[0].geometry.location.lat;
        //             console.log(json);
        //             return json; 
        //     }).catch(err => {
        //         console.error('fetch failed', err);
        // });

        return gl;
    }
}