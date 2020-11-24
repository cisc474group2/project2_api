import { GeoLocModel } from '../../event/geoloc/geolocModel';

export class BusModel{
    bus_name='';
    cName='';
    cPhone='';
    cEmail='';
    geoloc!: GeoLocModel;
    mailAddress='';
    hostedEvents:string[]=[];

    static fromObject(object:any):BusModel{
        const p:BusModel=new BusModel();
        p.bus_name=object.bus_name;
        p.cName=object.cName;
        p.cPhone=object.cPhone;
        p.cEmail=object.cEmail;
        p.geoloc=object.geoloc;
        p.mailAddress=object.mailAddress;
        p.hostedEvents=object.hostedEvents;
        return p;
    }
    toObject():any{
        return {name:this.bus_name,
            contact_name:this.cName,
            contact_phone:this.cPhone,
            contact_email:this.cEmail,
            geolocation:this.geoloc,
            mailAddress:this.mailAddress,
            hostedEvents:this.hostedEvents};
    }
}