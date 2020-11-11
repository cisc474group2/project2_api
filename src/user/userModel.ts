import bcrypt from 'bcrypt';
import { Timestamp } from 'mongodb';

export class UserModel{
    _id='';
    email='';
    private _password='';
    private _password_reset='';
    type='';
    type_obj=Object;
    last_login=Object;
    create_date=Object;
    reg_events:string[]=[];

    //when user password is set through here, it is stored encrypted
    set password(val:string) { 
        this._password=UserModel.encryptString(val);
    }

    //returns encrypted password
    get password():string{return this._password;}

    //encrypts password
    public constructor(email:string, password:string) {
        this.email = email;
        this.password = password;
    }

    static fromObject(object:any):UserModel{
        const u:UserModel=new UserModel(object.email, '');
        u._id=object.user_id;
        u.email=object.email;
        u._password=object.password;
        u._password_reset=object.password_reset;
        u.type=object.type;
        u.type_obj=object.type_object;
        u.last_login=object.last_login;
        u.reg_events=object.reg_events;
        return u;
    }
    toObject():any{
        return {email:this.email,
            password:this._password,
            password_reset:this._password_reset,
            type:this.type,
            type_obj:this.type_obj,
            last_login:this.last_login,
            reg_events:this.reg_events};
        }

    //compares unencrypted password to encrypted password
    validatePassword(password:string):boolean{
        if (this.password==='*') {return false;}
        return bcrypt.compareSync(password,this.password);
    }

    //encrypt a string using the bcrypt library
    static encryptString(inval:string):string{
        try {
            var salt  = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(inval, salt);
        }catch (err){
            return '*';
        }
    }
}