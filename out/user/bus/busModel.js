"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusModel = void 0;
var BusModel = /** @class */ (function () {
    function BusModel() {
        this.busName = '';
        this.cName = '';
        this.cPhone = '';
        this.cEmail = '';
        this.mailAddress = '';
        this.hostedEvents = [];
    }
    BusModel.fromObject = function (object) {
        var p = new BusModel();
        p.busName = object.busName;
        p.cName = object.cName;
        p.cPhone = object.cPhone;
        p.cEmail = object.cEmail;
        p.geoloc = object.geoloc;
        p.mailAddress = object.mailAddress;
        p.hostedEvents = object.hostedEvents;
        return p;
    };
    BusModel.prototype.toObject = function () {
        return { name: this.busName,
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