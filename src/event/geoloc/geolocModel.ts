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
}