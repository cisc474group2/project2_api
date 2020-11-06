"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndModel = void 0;
var IndModel = /** @class */ (function () {
    function IndModel() {
        this.fName = '';
        this.lName = '';
    }
    IndModel.fromObject = function (object) {
        var p = new IndModel();
        p.fName = object.busName;
        p.lName = object.cName;
        return p;
    };
    IndModel.prototype.toObject = function () {
        return { first_name: this.fName,
            last_name: this.lName
        };
    };
    return IndModel;
}());
exports.IndModel = IndModel;
//# sourceMappingURL=indModel.js.map