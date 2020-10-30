import express from 'express'
import { AppRouter } from './common/AppRouter';
import { SecurityRouter } from './security/securityrouter';
import { EventRouter } from './event/eventRouter';
import { UserRouter } from './user/userRouter';

//root router for the API

export class MainRouter extends AppRouter{
    constructor(){super();}

    //adds the child routers to various paths to form the overall API. 
    setupRoutes(): void {
        this.addRouter('/security',new SecurityRouter());        
        this.addRouter('/events', new EventRouter());
        this.addRouter('/users', new UserRouter());
    }
    
}