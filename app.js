/*
 * gx money markets main file
 * author : Saileela Puvvada
 */

const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let configAuth = require('./config')();
let routes = require('./routes');
const mongoose = require('mongoose');
var request = require('request');
var CronJob = require('cron').CronJob;

app.use(bodyParser.json({ limit: '10mb' })); 	// pull information from html in POST
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(methodOverride());

/*Allow CORS*/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Accept');
    next();
});

// MongoDB configuration
// Database connect options
var options = {
    poolSize: 2,
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    autoReconnect: true,
    reconnectTries: 300000,
    reconnectInterval: 5000,
    useNewUrlParser: true,
    poolSize: 2,
    auto_reconnect: true

};

var connectWithRetry = function () {
    return mongoose.connect(configAuth.MONGO_SERVER_PATH, options, function (err) {
        if (err) {
            console.log('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

var job1 = new CronJob('0 0 *1 * * *', function (req, res) {
    request({
        url: "http://localhost:" + configAuth.APP_PORT + "/gxmm/supplyborrowcalc",
        method: "POST", //Specify the method
        headers: {
            "Content-Type": "application/json",
        },
    }, function (error, response, body) {
        console.log("================", response);
    });
}, function () {
}, true, 'Asia/Kolkata');


var job2 = new CronJob('0 0 *1 * * * ', function (req, res) {
    request({
        url: "http://localhost:" + configAuth.APP_PORT + "/gxmm/pricecheck",
        method: "POST", //Specify the method
        headers: {
            "Content-Type": "application/json",
        },
    }, function (error, response, body) {
        console.log("++++++++++++++++++++++", response);
    });
}, function () {
}, true, 'Asia/Kolkata');
connectWithRetry();

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + configAuth.MONGO_SERVER_PATH);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log(err, 'Mongoose default connection error');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
    //  connectWithRetry();
});

// When the connection is reconnected
mongoose.connection.on('reconnected', function () {
    console.log('Mongoose default connection reconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

app.use('/gxmm', routes);

app.get('/', function (req, res) {
    res.send("Nvset Money Markets");
});

app.listen(configAuth.APP_PORT);
// app.use(Job);

console.log("Port running on " + configAuth.APP_PORT);