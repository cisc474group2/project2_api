
export class UserModel{
    user_id='';
    email='';
    password='';
    password_reset='';
    type='';
    type_obj='';
    last_login='';
    reg_events:string[]=[];

    static fromObject(object:any):UserModel{
        const u:UserModel=new UserModel();
        u.user_id=object.user_id;
        u.email=object.email;
        u.password=object.password;
        u.password_reset=object.password_reset;
        u.type=object.type;
        u.type_obj=object.type_object;
        u.last_login=object.last_login;
        u.reg_events=object.reg_events;
        return u;
    }
    toObject():any{
        return {user_id:this.user_id,email:this.email,password:this.password,password_reset:this.password_reset,type:this.type,type_obj:this.type_obj,last_login:this.last_login,reg_events:this.reg_events};
    }
}