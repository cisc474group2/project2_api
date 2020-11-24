"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var userModel_1 = require("./userModel");
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    //createUser
    //adds the user to the database
    UserController.prototype.createUser = function (req, res) {
        var user = userModel_1.UserModel.fromObject(req.body);
        UserController.db.addRecord(UserController.userTable, user.toObject())
            .then(function (result) { return res.send({ fn: 'createUser', status: 'success' }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //updateUser
    //updates the user info in the database with id :id
    UserController.prototype.updateUser = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        delete data.reg_events;
        UserController.db.updateRecord(UserController.userTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: 'updateUser', status: 'success' })) : (res.send({ fn: 'updateUser', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateUser', status: 'failure', data: err }).end(); });
    };
    //deleteUser
    //deletes the user in the database with id :id
    UserController.prototype.deleteUser = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        UserController.db.deleteRecord(UserController.userTable, { _id: id })
            .then(function (results) { return results ? (res.send({ fn: 'deleteUser', status: 'success' })) : (res.send({ fn: 'deleteUser', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //getType
    //gets the type of the user in the database with id: id
    UserController.prototype.getType = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        UserController.db.getOneRecord(UserController.userTable, { _id: id })
            .then(function (results) { return res.send({ fn: 'getType', status: 'success', data: results.type }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    //updateUserEvents
    //updates the user info in the database with id :id
    UserController.prototype.updateUserEvents = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        var reg_events = [];
        UserController.db.getOneRecord(UserController.userTable, { _id: id })
            .then(function (results) {
            reg_events = results.reg_events;
            if (reg_events == null)
                reg_events = [];
            if (!results.reg_events.includes(data.reg_events)) {
                reg_events.push(data.reg_events);
            }
            UserController.db.updateRecord(UserController.userTable, { _id: id }, { $set: { reg_events: reg_events } })
                .then(function (results) { return results ? (res.send({ fn: 'updateUserEvents', status: 'success' })) : (res.send({ fn: 'updateUserEvents', status: 'failure', data: 'Not found' })).end(); })
                .catch(function (err) { return res.send({ fn: 'updateUserEvents', status: 'failure', data: err })
                .end(); });
        })
            .catch(function (reason) {
            return res.status(500).send(reason).end();
        });
    };
    UserController.db = new MongoDB_1.Database(config_1.Config.url_elevated, "DEV");
    UserController.userTable = 'USER';
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map