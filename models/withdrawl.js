/*
 * withdraw model
 * author: saileela puvvada
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var withdrawlSchema = new Schema({
    user_eth_addr: {
        type: String
    },
    available_withdraw_amount: {
        type: String
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
        type: Number,
    },
    date: {
        type: String,
        default: Date.now()
    },
    withdraw_requested: {
        type: String
    },

    status: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('withdrawal', withdrawlSchema);