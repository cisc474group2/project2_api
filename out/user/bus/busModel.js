"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusModel = void 0;
var BusModel = /** @class */ (function () {
    function BusModel() {
        this.bus_name = '';
        this.cName = '';
        this.cPhone = '';
        this.cEmail = '';
        this.mailAddress = '';
        this.hostedEvents = [];
    }
    BusModel.fromObject = function (object) {
        var p = new BusModel();
        p.bus_name = object.bus_name;
        p.cName = object.cName;
        p.cPhone = object.cPhone;
        p.cEmail = object.cEmail;
        p.geoloc = object.geoloc;
        p.mailAddress = object.mailAddress;
        p.hostedEvents = object.hostedEvents;
        return p;
    };
    BusModel.prototype.toObject = function () {
        return { name: this.bus_name,
            contact_name: this.cName,
            contact_phone: this.cPhone,
            contact_email: this.cEmail,
            geolocation: this.geoloc,
            mailAddress: this.mailAddress,
            hostedEvents: this.hostedEvents };
    };
    return BusModel;
}());
exports.BusModel = BusModel;
//# sourceMappingURL=busModel.js.map