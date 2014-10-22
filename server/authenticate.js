var DB              = require("./db_mapper");
var db        = new DB();
var _               = require("underscore");
var restify         = require("restify");

function Authenticate() {
    'use strict';
    return;
}

Authenticate.prototype.login = function (req, res, next) {
    'use strict';
    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('Name must be supplied'));
    }
    db.getByName(req.params.name, function (result) {
        if (req.params.password === _.first(result).password) {
            res.send({status: "success"});
            next();
        } else {
            res.send({status: "fail"});
            next();
        }
    });
};

Authenticate.prototype.create = function (req, res, next) {
    'use strict';
    if (req.params.name === undefined || req.params.password === undefined || req.params.email === undefined) {
        return next(new restify.InvalidArgumentError('Name must be supplied'));
    }
    db.createAccount(req.params, function (result) {
        if (result.status === "success") {
            res.send({status: "success"});
            next();
        } else {
            res.send({status: "fail"});
            next();
        }
    });
};


module.exports = Authenticate;