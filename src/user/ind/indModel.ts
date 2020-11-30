import { NumberLiteralType } from "typescript";
import { GeoLocModel } from '../../event/geoloc/geolocModel';

export class IndModel{
    fName='';
    lName='';
    zip:number = 0;
    geoloc!:GeoLocModel;

    static fromObject(object:any):IndModel{
        const p:IndModel=new IndModel();
        p.fName=object.busName;
        p.lName=object.cName;
        p.zip = object.zip
        p.geoloc = object.geoloc;
        return p;
    }
    toObject():any{
        return {first_name:this.fName,
            last_name:this.lName
        };
    }
}