export class OtherModel{
    

    static fromObject(object:any):OtherModel{
        const p:OtherModel=new OtherModel();
        return p;
    }
    toObject():any{
        return {};
    }
}