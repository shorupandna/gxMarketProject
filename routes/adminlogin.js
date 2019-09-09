/*
 * admin login route
 * author : Saileela Puvvada
 */

var AdminLogin = require('../models/adminlogin');
var KeyGenerate = require('../models/keygenerate');
var jwt = require('jwt-simple');
var config = require('../config')();
var moment = require('moment');

//login for an admin
var adminLogin = function (req, res) {
    var login = new AdminLogin({
        username: req.body.username,
        password: req.body.password,
        user_type: 'teachers',
        status: "active"
    });
    login.save(function (err, saved_logins) {
        if (saved_logins) {
            var token = jwt.encode({
                loginid: saved_logins._id,
                usertype: saved_logins.user_type
            }, config.JWT_TOKEN_SECRET);
            res.send({ status: "success", token: token, user_type: saved_logins.user_type });
        } else {
            console.log(err);
            res.send({ status: "failure", message: "error in saving" });
        }
    });
};

//generate token or key for and a teacher
generateKey = function (req, res) {
    var text = '';
    var randomstring = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < 8; i++) {
        text = Math.floor(Math.random() * possible.length);
        randomstring += possible.substring(text, text + 1);
    }
    AdminLogin.findOne({ user_type: req.params.type }, function (err, login_details) {
        var randomKey = new KeyGenerate({
            key: randomstring,
            user_type: login_details.user_type
        });
        randomKey.save(function (err, saved_key) {
            if (saved_key) {
                res.send({ status: "success", key: randomstring });
            } else {
                res.send({ status: "failure", message: "error in saving" });
            }
        });
    });
    //    var acc = randomstring.match(/\d{2}/g).join(" ");
    //    console.log(acc);
};

//compare password from DB to Request
comparePasswordLogin = function (req, res) {
    var login_query = {};
    if (req.body.username == 'admin') {
        login_query = { "username": req.body.username, password: req.body.password };
        if (login_query["password"] !== undefined) {
            AdminLogin.findOne(login_query).exec(function (err, admin_login) {
                admin_login.updated_Date = new Date();
                admin_login.save(function (err, saved_login) {
                    if (saved_login) {
                        var token = jwt.encode({
                            loginid: saved_login._id, exp: moment(),
                            usertype: saved_login.user_type
                        }, config.JWT_TOKEN_SECRET);
                        res.send({ status: "success", user_type: saved_login.user_type, auth_token: token });
                    }
                })
            });
        }
    } else {
        login_query = { "username": req.body.username, password: req.body.password };
        KeyGenerate.findOne({ user_type: req.body.username }).exec(function (err, generated_key) {
            if (generated_key.key == login_query['password']) {
                console.log(generated_key);
                var token = jwt.encode({
                    loginid: generated_key._id, exp: moment(),
                    usertype: generated_key.user_type
                }, config.JWT_TOKEN_SECRET);
                res.send({ status: "success", auth_token: token, user_type: generated_key.user_type });
            }
        });
    }
};
module.exports.route = function (router) {
    router.post('/admin/login', adminLogin);
    router.get('/generatekey/:type', generateKey);
    router.post('/login/password/create', comparePasswordLogin);
};