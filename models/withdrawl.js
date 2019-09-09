/*
 * withdraw model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var withdrawlSchema = new Schema({
    user_eth_addr: {
        type: String,
    },
    market_name: {
        type: String
    },
    deficit_cash: {
        type: String,
    },

    txn_hash: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Date,
        default: Date.now()
    },
    withdraw_requested: { type: String },

    status: {
        type: String
    },
    created_Date: {
        type: Date,
        default: new Date()
    },
    updated_Date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('withdrawl', withdrawlSchema);