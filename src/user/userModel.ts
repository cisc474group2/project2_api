import bcrypt from 'bcrypt';

export class UserModel{
    user_id='';
    email='';
    private _password='';
    private _password_reset='';
    type='';
    type_obj='';
    last_login='';
    reg_events:string[]=[];

    set password(val:string) { 
        this._password=UserModel.encryptString(val);
    }

    get password():string{return this._password;}

    public constructor(email:string, password:st)

    static fromObject(object:any):UserModel{
        const u:UserModel=new UserModel();
        u.user_id=object.user_id;
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
        return {user_id:this.user_id,
            email:this.email,
            password:this._password,
            password_reset:this._password_reset,
            type:this.type,
            type_obj:this.type_obj,
            last_login:this.last_login,
            reg_events:this.reg_events};
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