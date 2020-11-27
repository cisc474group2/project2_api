import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { UserController } from "./userController";
import { BusRouter } from './bus/busRouter';
import { IndRouter } from './ind/indRouter';

//Router for user portion of the API
export class UserRouter extends AppRouter{
    static userController: UserController=new UserController();
    constructor(){super();}

    //called by the framework to add the routes for the user portion of the API
    setupRoutes(): void {      
        this.addRouter('/bus', new BusRouter());
        this.addRouter('/ind', new IndRouter());

        this.expressRouter.post('/',[SecurityMiddleware.RequireAuth],UserRouter.userController.createUser);
        this.expressRouter.put('/:id',[SecurityMiddleware.RequireAuth],UserRouter.userController.updateUser);
        this.expressRouter.delete('/:id',[SecurityMiddleware.RequireAuth],UserRouter.userController.deleteUser);
        this.expressRouter.get('/:id/type',[SecurityMiddleware.RequireAuth],UserRouter.userController.getType);
<<<<<<< HEAD
        this.expressRouter.put('/:id/registered',UserRouter.userController.updateUserEvents);
=======
        this.expressRouter.put('/:id/registered', UserRouter.userController.updateUserEvents);
>>>>>>> 200300ff2e7d4b16c2c66dae8816b45f77aec2a9
    }    
}