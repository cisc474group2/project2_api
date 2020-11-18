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
        const g:GeoLocModel = new GeoLocModel();
        const addressComponents = combinedAddress.split('+');
        const getZipData = (async () => {
			const dynURL = Config.GOOGLE_GEOCODING
				.replace('<<OUT>>', 'json')
                .replace('<<ADDR>>', addressComponents[0] + 
                                    '+' + addressComponents[2] + 
                                    '+' + addressComponents[3] + 
                                    '+' + addressComponents[4])
				.replace('<<KEY>>', Config.GOOGLE_API);
            const response = await fetch(dynURL);
            return await response.json()}); 
		
		console.log(getZipData);
		//this.lng = longitude;
		//this.lat = latitude;

        g.lat = 0;
        g.lng = 0;
        return g;
    }
}