
export class BusModel{
    busName='';
    cName='';
    cPhone='';
    cEmail='';
    geoloc='';
    mailAddress='';
    hostedEvents:string[]=[];

    static fromObject(object:any):BusModel{
        const p:BusModel=new BusModel();
        p.busName=object.busName;
        p.cName=object.cName;
        p.cPhone=object.cPhone;
        p.cEmail=object.cEmail;
        p.geoloc=object.geoloc;
        p.mailAddress=object.mailAddress;
        p.hostedEvents=object.hostedEvents;
        return p;
    }
    toObject():any{
        return {name:this.busName,
            contact_name:this.cName,
            contact_phone:this.cPhone,
            contact_email:this.cEmail,
            geolocation:this.geoloc,
            mailAddress:this.mailAddress,
            hostedEvents:this.hostedEvents};
    }
}