"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
var geolocRouter_1 = require("./geoloc/geolocRouter");
//Router for events portion of the API
var EventRouter = /** @class */ (function (_super) {
    __extends(EventRouter, _super);
    function EventRouter() {
        return _super.call(this) || this;
    }
    //called by the framework to add the routes for the events portion of the API
    EventRouter.prototype.setupRoutes = function () {
        this.addRouter('/geo', new geolocRouter_1.GeoLocRouter());
        this.expressRouter.post('/bulk', EventRouter.eventController.getBulkEventLookupByID);
        this.expressRouter.get('/search', EventRouter.eventController.getEventsFilterQuery);
        this.expressRouter.get('/getTitleInfo/:lat/:lng', EventRouter.eventController.getTitleInfo);
        this.expressRouter.get('/', EventRouter.eventController.getEvents);
        this.expressRouter.get('/:id', EventRouter.eventController.getEventByID);
        this.expressRouter.post('/', [securityMiddleware_1.SecurityMiddleware.RequireAuth], EventRouter.eventController.createEvent);
        this.expressRouter.put('/:id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], EventRouter.eventController.updateEvent);
        this.expressRouter.delete('/:id', EventRouter.eventController.deleteEvent);
        this.expressRouter.get('/:id/registered', EventRouter.eventController.getRegisteredInd);
        this.expressRouter.put('/:id/registered', EventRouter.eventController.updateAttendees);
        this.expressRouter.put('/:id/registered/delete', EventRouter.eventController.deleteAttendee);
    };
    EventRouter.eventController = new eventController_1.EventsController();
    return EventRouter;
}(AppRouter_1.AppRouter));
exports.EventRouter = EventRouter;
//# sourceMappingURL=eventRouter.js.map