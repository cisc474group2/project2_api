
export class IndModel{
    fName='';
    lName='';

    static fromObject(object:any):IndModel{
        const p:IndModel=new IndModel();
        p.fName=object.busName;
        p.lName=object.cName;
        return p;
    }
    toObject():any{
        return {first_name:this.fName,
            last_name:this.lName
        };
    }
}