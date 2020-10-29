import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { UserController } from "./userController";
import { BusRouter } from './bus/busRouter';
//import { IndRouter } from './bus/indRouter';

//This is just an example second router to show how additional routers can be added
export class UserRouter extends AppRouter{
    static userController: UserController=new UserController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        this.addRouter('/bus', new BusRouter());
        //this.addRouter('/ind', new IndRouter());

        this.expressRouter.post('user/',[SecurityMiddleware.RequireAuth],UserRouter.userController.createUser);
        this.expressRouter.put('user/:id',[SecurityMiddleware.RequireAuth],UserRouter.userController.updateUser);
        this.expressRouter.delete('user/:id',[SecurityMiddleware.RequireAuth],UserRouter.userController.deleteUser);
    }    
}