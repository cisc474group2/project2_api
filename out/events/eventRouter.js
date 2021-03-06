"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
var AppRouter_1 = require("../common/AppRouter");
var securityMiddleware_1 = require("../security/securityMiddleware");
var eventController_1 = require("./eventController");
//Router for events portion of the api
var EventRouter = /** @class */ (function (_super) {
    __extends(EventRouter, _super);
    function EventRouter() {
        return _super.call(this) || this;
    }
    //called by the framework to add the routes for the security portion of the API
    EventRouter.prototype.setupRoutes = function () {
        this.expressRouter.get('/events', EventRouter.eventController.getEvents);
        this.expressRouter.get('/:events/:id', EventRouter.eventController.getEventByID);
        this.expressRouter.post('/events', [securityMiddleware_1.SecurityMiddleware.RequireAuth], EventRouter.eventController.createEvent);
        this.expressRouter.put('/:events/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], EventRouter.eventController.updateEvent);
        this.expressRouter.delete('/:events/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], EventRouter.eventController.deleteEvent);
    };
    EventRouter.eventController = new eventController_1.EventsController();
    return EventRouter;
}(AppRouter_1.AppRouter));
exports.EventRouter = EventRouter;
//# sourceMappingURL=eventRouter.js.map