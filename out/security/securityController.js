"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var userModel_1 = require("../user/userModel");
var MongoDB_1 = require("../common/MongoDB");
var busModel_1 = require("../user/bus/busModel");
var indModel_1 = require("../user/ind/indModel");
var geolocModel_1 = require("../event/geoloc/geolocModel");
//Implementation of security endpoints
var SecurityController = /** @class */ (function () {
    function SecurityController() {
    }
    //login - POST
    //expects email and password fields to be set in the body of the post request
    //sends a token to the caller on success, 401 on failure
    SecurityController.prototype.login = function (req, res, next) {
        SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
            .then(function (userRecord) {
            if (!userRecord)
                return res.sendStatus(401).end();
            var usr = userModel_1.UserModel.fromObject(userRecord);
            if (!usr.validatePassword(req.body.password))
                return res.sendStatus(401).end();
            var token = jsonwebtoken_1.default.sign(usr.toObject(), config_1.Config.secret, { expiresIn: config_1.Config.tokenLife });
            res.send({ fn: 'login', status: 'success', data: { token: token, user: { email: req.body.email } } }).end();
        }).catch(function (err) { return res.sendStatus(500).end(); });
    };
    SecurityController.prototype.privateRegister = function (req, res, user) {
        console.log("privateRegister");
        SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
            .then(function (userRecord) {
            if (userRecord)
                return res.status(400).send({ fn: 'register', status: 'failure', data: 'User Exists' }).end();
            SecurityController.db.addRecord(SecurityController.usersTable, user.toObject()).then(function (result) {
                SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
                    .then(function (userRecord) {
                    if (!userRecord)
                        return res.sendStatus(401).end();
                    var usr = userModel_1.UserModel.fromObject(userRecord);
                    if (!usr.validatePassword(req.body.password))
                        return res.sendStatus(401).end();
                    var token = jsonwebtoken_1.default.sign(usr.toObject(), config_1.Config.secret, { expiresIn: config_1.Config.tokenLife });
                    res.send({ fn: 'login', status: 'success', data: { token: token, user: { email: req.body.email } } }).end();
                });
                //res.send({ fn: 'register', status: 'success' }).end();
            }).catch(function (reason) { return res.sendStatus(500).end(); });
        }).catch(function (reason) { return res.sendStatus(500).end(); });
    };
    //register - POST
    //expects email and password fields to be set in the body of the post request
    //sends a success message to caller on success, or a failure status code on failure
    SecurityController.prototype.register = function (req, res, next) {
        var user = new userModel_1.UserModel(req.body.email, req.body.password);
        var user_type = req.body.type;
        var type_obj = null;
        var detail_error = "unknown type passes";
        if (user_type == "I") {
            geolocModel_1.GeoLocModel.googleZipCoding(req.body.type_obj.zip).then(function (result) {
                detail_error = "google api returned";
                type_obj = new indModel_1.IndModel();
                type_obj.fName = req.body.type_obj.first_name;
                type_obj.lName = req.body.type_obj.last_name;
                type_obj.zip = req.body.type_obj.zip;
                type_obj.geoloc = result;
                //do record insert here
                user.type = user_type;
                user.type_obj = type_obj;
                var sc = new SecurityController();
                sc.privateRegister(req, res, user);
            }).catch(function (err) {
                console.log(err, detail_error);
                res.status(500).send(err).end();
            });
        }
        else if (user_type == "B") {
            geolocModel_1.GeoLocModel.googleGeoCoding(req.body.type_obj.bus_address).then(function (result) {
                detail_error = "google api returned";
                type_obj = new busModel_1.BusModel();
                type_obj.bus_name = req.body.type_obj.bus_name;
                type_obj.cName = req.body.type_obj.contact_name;
                type_obj.cPhone = req.body.type_obj.contact_phone;
                type_obj.cEmail = req.body.type_obj.contact_email;
                type_obj.mailAddress = req.body.type_obj.bus_address;
                type_obj.geoloc = result;
                user.type = user_type;
                user.type_obj = type_obj;
                console.log("finished making entry");
                var sc = new SecurityController();
                sc.privateRegister(req, res, user);
            }).catch(function (err) {
                console.log(err, detail_error);
                res.status(500).send(err).end();
            });
        }
        else {
            console.log("Big Error at securityController/register");
        }
    };
    //authorize - GET
    //this code actually does nothing, but if it is secured at the route level, it will return the email address for the token that
    //was returned.  This is used to verify a token by a client application
    //returns the users email on success
    SecurityController.prototype.authorize = function (req, res, next) {
        //validate that req.authUser exists, if so, return the user's email address.
        console.log();
        SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.authUser.email })
            .then(function (results) { return res.send({ fn: 'authorize', status: 'success', data: { _id: results._id, email: results.email, type: results.type,
                type_obj: results.type_obj, reg_events: results.reg_events } }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //changePwd - POST
    //chages the password of the user represented in the token.  Expects password in the body of the POST
    //returns a success messager to the client on success, a failure status code on failure
    SecurityController.prototype.changePwd = function (req, res, next) {
        if (!req.body.password)
            res.status(400).send({ fn: 'changePwd', status: 'failure' }).end();
        var user = new userModel_1.UserModel(req.body.authUser.email, req.body.password);
        SecurityController.db.updateRecord(SecurityController.usersTable, { email: user.email }, { $set: { password: user.password } }).then(function (result) {
            if (result)
                res.send({ fn: 'changePwd', status: 'success' }).end();
            else
                res.status(400).send({ fn: 'changePwd', status: 'failure' }).end();
        }).catch(function (err) { return res.send({ fn: 'changePwd', status: 'failure', data: err }).end(); });
    };
    SecurityController.db = new MongoDB_1.Database(config_1.Config.url_elevated, "DEV");
    SecurityController.usersTable = 'USER';
    return SecurityController;
}());
exports.SecurityController = SecurityController;
//# sourceMappingURL=securityController.js.map