/*
 * decode the token 
 * author : saileela puvvada
 */

var jwt = require('jwt-simple');
var config = require('../config')();
// var AdminLogin = require('../models/adminlogin');
var mongoose = require('mongoose');

module.exports = function (req, res, next) {
    //If req has authenticate
    var bearertoken;
    var bearerHeader = req.headers.authorization;
    try {
        if (typeof bearerHeader != 'undefined') {
            var bearer = bearerHeader;
            bearertoken = jwt.decode(bearer, config.JWT_TOKEN_SECRET);
            //            console.log(bearertoken);
            AdminLogin.findById(mongoose.Types.ObjectId(bearertoken.loginid), function (err, user) {
                console.log(user);
                if (err || !user) {
                    console.log("Authentication failure !!");
                    res.send(401, { error: 'Unauthorized access' });
                } else {
                    if (user.user_type === "admin") {
                        //                        Admin.findById(user.ref_id, function (err, admin) {
                        //                            if (admin) {
                        //                                req.admin = admin;
                        req.user = user;
                        next();
                        //                            }
                        //                        });
                    } else if (user.user_type === "user") {
                        req.user = user;
                        next();
                    } else {
                        console.log(err);
                        res.send({ status: "active", message: "Unauthorized Access" });
                    }
                }
            });
        } else {
            res.statusCode = 403;
            res.send({ error: 'Forbidden access' });
        }
    } catch (err) {
        console.log("Invalid token");
        res.send(401, { error: 'invalid Token' });
    }
};